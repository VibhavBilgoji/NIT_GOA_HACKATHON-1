// API Client for OurStreet frontend
// Handles all API requests with authentication

import Cookies from "js-cookie";
import {
  AuthResponse,
  ApiResponse,
  Issue,
  Comment,
  DashboardStats,
  CreateIssueRequest,
  UpdateIssueRequest,
  CreateCommentRequest,
  IssueFilters,
  User,
} from "./types";

// Simplified user type for auth responses (doesn't include all User fields)
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

// Token management
const TOKEN_KEY = "ourstreet_token";
const USER_KEY = "ourstreet_user";

// Base API URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

// Store token in cookie
export function setAuthToken(token: string): void {
  Cookies.set(TOKEN_KEY, token, { expires: 7, sameSite: "strict" });
}

// Get token from cookie
export function getAuthToken(): string | undefined {
  return Cookies.get(TOKEN_KEY);
}

// Remove token from cookie
export function removeAuthToken(): void {
  Cookies.remove(TOKEN_KEY);
  Cookies.remove(USER_KEY);
}

// Store user data
export function setUserData(user: AuthUser): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

// Get user data
export function getUserData(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
}

// Remove user data
export function removeUserData(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(USER_KEY);
  }
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return !!getAuthToken();
}

// Generic API request function
async function apiRequest<T = unknown>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getAuthToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Add existing headers
  if (options.headers) {
    Object.entries(options.headers).forEach(([key, value]) => {
      headers[key] = value as string;
    });
  }

  // Add authorization header if token exists
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();

    // Handle unauthorized responses
    if (response.status === 401) {
      removeAuthToken();
      removeUserData();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    return data;
  } catch (error) {
    console.error("API request failed:", error);
    return {
      success: false,
      error: "Network error. Please check your connection.",
    };
  }
}

// Authentication API
export const authAPI = {
  // Signup
  async signup(data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }): Promise<AuthResponse> {
    const response = (await apiRequest("/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
    })) as AuthResponse;

    if (response.success && response.token) {
      setAuthToken(response.token);
      if (response.user) {
        setUserData(response.user);
      }
    }

    return response;
  },

  // Login
  async login(data: {
    email: string;
    password: string;
  }): Promise<AuthResponse> {
    const response = (await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    })) as AuthResponse;

    if (response.success && response.token) {
      setAuthToken(response.token);
      if (response.user) {
        setUserData(response.user);
      }
    }

    return response;
  },

  // Logout
  logout(): void {
    removeAuthToken();
    removeUserData();
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  },
};

// Issues API
export const issuesAPI = {
  // Get all issues
  async getAll(
    filters?: IssueFilters,
  ): Promise<ApiResponse<{ issues: Issue[]; total: number }>> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });
    }

    const query = params.toString();
    return apiRequest(`/issues${query ? `?${query}` : ""}`);
  },

  // Get single issue
  async getById(id: string): Promise<ApiResponse<Issue>> {
    return apiRequest(`/issues/${id}`);
  },

  // Create new issue
  async create(data: CreateIssueRequest): Promise<ApiResponse<Issue>> {
    return apiRequest("/issues", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // Update issue
  async update(
    id: string,
    data: UpdateIssueRequest,
  ): Promise<ApiResponse<Issue>> {
    return apiRequest(`/issues/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  // Delete issue
  async delete(id: string): Promise<ApiResponse> {
    return apiRequest(`/issues/${id}`, {
      method: "DELETE",
    });
  },
};

// Comments API
export const commentsAPI = {
  // Get comments for issue
  async getByIssueId(
    issueId: string,
  ): Promise<ApiResponse<{ comments: Comment[]; total: number }>> {
    return apiRequest(`/issues/${issueId}/comments`);
  },

  // Add comment
  async create(
    issueId: string,
    data: CreateCommentRequest,
  ): Promise<ApiResponse<Comment>> {
    return apiRequest(`/issues/${issueId}/comments`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // Delete comment
  async delete(issueId: string, commentId: string): Promise<ApiResponse> {
    return apiRequest(`/issues/${issueId}/comments?commentId=${commentId}`, {
      method: "DELETE",
    });
  },
};

// Votes API
export const votesAPI = {
  // Toggle vote
  async toggle(
    issueId: string,
  ): Promise<ApiResponse<{ voted: boolean; votes: number }>> {
    return apiRequest(`/issues/${issueId}/vote`, {
      method: "POST",
    });
  },

  // Check vote status
  async getStatus(
    issueId: string,
  ): Promise<ApiResponse<{ voted: boolean; votes: number }>> {
    return apiRequest(`/issues/${issueId}/vote`);
  },
};

// Dashboard API
export const dashboardAPI = {
  // Get dashboard stats
  async getStats(): Promise<ApiResponse<DashboardStats>> {
    return apiRequest("/dashboard");
  },
};

// User API
export const userAPI = {
  // Get current user profile
  async getProfile(): Promise<
    ApiResponse<{
      user: Omit<User, "password">;
      stats: {
        issuesCreated: number;
        commentsPosted: number;
        votesGiven: number;
      };
    }>
  > {
    return apiRequest("/user");
  },

  // Update profile
  async update(data: { name?: string; avatar?: string }): Promise<ApiResponse> {
    return apiRequest("/user", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  // Delete account
  async delete(): Promise<ApiResponse> {
    return apiRequest("/user", {
      method: "DELETE",
    });
  },
};

// Export all APIs as a single object
const api = {
  auth: authAPI,
  issues: issuesAPI,
  comments: commentsAPI,
  votes: votesAPI,
  dashboard: dashboardAPI,
  user: userAPI,
};

export default api;
