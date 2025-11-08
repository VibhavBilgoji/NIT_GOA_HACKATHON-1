import { NextRequest, NextResponse } from "next/server";
import { issueDb } from "@/lib/db";
import { getUserFromRequest } from "@/lib/auth";
import {
  Issue,
  CreateIssueRequest,
  ApiResponse,
  IssueFilters,
} from "@/lib/types";

// GET /api/issues - Get all issues with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Extract filters from query params
    const filters: IssueFilters = {
      status:
        (searchParams.get("status") as IssueFilters["status"]) || undefined,
      category:
        (searchParams.get("category") as IssueFilters["category"]) || undefined,
      priority:
        (searchParams.get("priority") as IssueFilters["priority"]) || undefined,
      userId: searchParams.get("userId") || undefined,
      search: searchParams.get("search") || undefined,
      sortBy:
        (searchParams.get("sortBy") as IssueFilters["sortBy"]) || "createdAt",
      sortOrder:
        (searchParams.get("sortOrder") as IssueFilters["sortOrder"]) || "desc",
      limit: parseInt(searchParams.get("limit") || "100"),
      offset: parseInt(searchParams.get("offset") || "0"),
    };

    let issues = await issueDb.getAll();

    // Apply filters
    if (filters.status) {
      issues = issues.filter((issue: Issue) => issue.status === filters.status);
    }

    if (filters.category) {
      issues = issues.filter(
        (issue: Issue) => issue.category === filters.category,
      );
    }

    if (filters.priority) {
      issues = issues.filter(
        (issue: Issue) => issue.priority === filters.priority,
      );
    }

    if (filters.userId) {
      issues = issues.filter((issue: Issue) => issue.userId === filters.userId);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      issues = issues.filter(
        (issue: Issue) =>
          issue.title.toLowerCase().includes(searchLower) ||
          issue.description.toLowerCase().includes(searchLower) ||
          issue.location.toLowerCase().includes(searchLower),
      );
    }

    // Sort issues
    issues.sort((a: Issue, b: Issue) => {
      const sortBy = filters.sortBy || "createdAt";
      let aVal: string | number = a[sortBy as keyof Issue] as string | number;
      let bVal: string | number = b[sortBy as keyof Issue] as string | number;

      if (sortBy === "createdAt") {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      }

      if (filters.sortOrder === "asc") {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    // Apply pagination
    const total = issues.length;
    const paginatedIssues = issues.slice(
      filters.offset,
      filters.offset! + filters.limit!,
    );

    return NextResponse.json(
      {
        success: true,
        data: {
          issues: paginatedIssues,
          total,
          limit: filters.limit,
          offset: filters.offset,
        },
      } as ApiResponse,
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching issues:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch issues",
      } as ApiResponse,
      { status: 500 },
    );
  }
}

// POST /api/issues - Create a new issue
export async function POST(request: NextRequest) {
  try {
    // Get user from auth token
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized - Please login to report issues",
        } as ApiResponse,
        { status: 401 },
      );
    }

    const body: CreateIssueRequest = await request.json();
    const { title, description, category, location, coordinates, photoUrl } =
      body;

    // Validation
    if (!title || !description || !category || !location) {
      return NextResponse.json(
        {
          success: false,
          error: "Title, description, category, and location are required",
        } as ApiResponse,
        { status: 400 },
      );
    }

    // Validate title length
    if (title.trim().length < 5) {
      return NextResponse.json(
        {
          success: false,
          error: "Title must be at least 5 characters long",
        } as ApiResponse,
        { status: 400 },
      );
    }

    // Validate description length
    if (description.trim().length < 10) {
      return NextResponse.json(
        {
          success: false,
          error: "Description must be at least 10 characters long",
        } as ApiResponse,
        { status: 400 },
      );
    }

    // Validate category
    const validCategories = [
      "pothole",
      "streetlight",
      "garbage",
      "water_leak",
      "road",
      "sanitation",
      "drainage",
      "electricity",
      "traffic",
      "other",
    ];

    if (!validCategories.includes(category)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid category",
        } as ApiResponse,
        { status: 400 },
      );
    }

    // Validate coordinates
    if (!coordinates || !coordinates.lat || !coordinates.lng) {
      return NextResponse.json(
        {
          success: false,
          error: "Valid coordinates are required",
        } as ApiResponse,
        { status: 400 },
      );
    }

    // Determine priority based on category
    let priority: "low" | "medium" | "high" | "critical" = "medium";
    if (["water_leak", "electricity", "traffic"].includes(category)) {
      priority = "high";
    } else if (["pothole", "streetlight"].includes(category)) {
      priority = "medium";
    } else {
      priority = "low";
    }

    // Create new issue
    const newIssue = await issueDb.create({
      title: title.trim(),
      description: description.trim(),
      category,
      location: location.trim(),
      coordinates,
      photoUrl: photoUrl || undefined,
      status: "open",
      priority,
      userId: user.userId,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Issue reported successfully",
        data: newIssue,
      } as ApiResponse<Issue>,
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating issue:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create issue. Please try again.",
      } as ApiResponse,
      { status: 500 },
    );
  }
}

// DELETE /api/issues - Delete all issues (admin only)
export async function DELETE(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        } as ApiResponse,
        { status: 401 },
      );
    }

    // In production, check if user is admin
    // For now, we'll allow it for demo purposes

    return NextResponse.json(
      {
        success: true,
        message: "Bulk delete not implemented for safety",
      } as ApiResponse,
      { status: 403 },
    );
  } catch (error) {
    console.error("Error in DELETE issues:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      } as ApiResponse,
      { status: 500 },
    );
  }
}
