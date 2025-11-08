// Database types and interfaces for CityPulse

export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // hashed
  role: "citizen" | "admin" | "authority";
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  location: string; // Address string
  coordinates: {
    lat: number;
    lng: number;
  };
  photoUrl?: string;
  status: IssueStatus;
  priority: IssuePriority;
  userId: string;
  votes: number;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  assignedTo?: string; // Authority user ID
}

export type IssueCategory =
  | "pothole"
  | "streetlight"
  | "garbage"
  | "water_leak"
  | "road"
  | "sanitation"
  | "drainage"
  | "electricity"
  | "traffic"
  | "other";

export type IssueStatus = "open" | "in-progress" | "resolved" | "closed";

export type IssuePriority = "low" | "medium" | "high" | "critical";

export interface Comment {
  id: string;
  issueId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}

export interface Vote {
  id: string;
  issueId: string;
  userId: string;
  createdAt: string;
}

export interface DashboardStats {
  totalIssues: number;
  openIssues: number;
  inProgressIssues: number;
  resolvedIssues: number;
  totalReports: number;
  averageResolutionTime: number; // in days
  categoryBreakdown: {
    category: IssueCategory;
    count: number;
  }[];
  recentActivity: {
    date: string;
    count: number;
  }[];
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  error?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  token?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// Request types
export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CreateIssueRequest {
  title: string;
  description: string;
  category: IssueCategory;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  photoUrl?: string;
}

export interface UpdateIssueRequest {
  title?: string;
  description?: string;
  status?: IssueStatus;
  priority?: IssuePriority;
  assignedTo?: string;
}

export interface CreateCommentRequest {
  content: string;
}

// Filter types
export interface IssueFilters {
  status?: IssueStatus;
  category?: IssueCategory;
  priority?: IssuePriority;
  userId?: string;
  search?: string;
  sortBy?: "createdAt" | "votes" | "priority";
  sortOrder?: "asc" | "desc";
  limit?: number;
  offset?: number;
}
