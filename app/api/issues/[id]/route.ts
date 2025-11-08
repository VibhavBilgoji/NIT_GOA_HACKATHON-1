import { NextRequest, NextResponse } from "next/server";
import { issueDb, userDb } from "@/lib/db";
import { getUserFromRequest } from "@/lib/auth";
import { ApiResponse, UpdateIssueRequest, Issue } from "@/lib/types";

// GET /api/issues/[id] - Get a single issue by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const issue = issueDb.findById(id);

    if (!issue) {
      return NextResponse.json(
        {
          success: false,
          error: "Issue not found",
        } as ApiResponse,
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: issue,
      } as ApiResponse<Issue>,
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching issue:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch issue",
      } as ApiResponse,
      { status: 500 },
    );
  }
}

// PUT /api/issues/[id] - Update an issue
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized - Please login",
        } as ApiResponse,
        { status: 401 },
      );
    }

    const { id } = await params;
    const issue = issueDb.findById(id);

    if (!issue) {
      return NextResponse.json(
        {
          success: false,
          error: "Issue not found",
        } as ApiResponse,
        { status: 404 },
      );
    }

    // Check if user owns this issue or is admin
    const requestUser = userDb.findById(user.userId);
    if (issue.userId !== user.userId && requestUser?.role !== "admin") {
      return NextResponse.json(
        {
          success: false,
          error: "Forbidden - You can only update your own issues",
        } as ApiResponse,
        { status: 403 },
      );
    }

    const body: UpdateIssueRequest = await request.json();
    const { title, description, status, priority, assignedTo } = body;

    // Validate updates
    if (title && title.trim().length < 5) {
      return NextResponse.json(
        {
          success: false,
          error: "Title must be at least 5 characters long",
        } as ApiResponse,
        { status: 400 },
      );
    }

    if (description && description.trim().length < 10) {
      return NextResponse.json(
        {
          success: false,
          error: "Description must be at least 10 characters long",
        } as ApiResponse,
        { status: 400 },
      );
    }

    // Validate status
    if (
      status &&
      !["open", "in-progress", "resolved", "closed"].includes(status)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid status",
        } as ApiResponse,
        { status: 400 },
      );
    }

    // Validate priority
    if (priority && !["low", "medium", "high", "critical"].includes(priority)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid priority",
        } as ApiResponse,
        { status: 400 },
      );
    }

    // Update issue
    const updates: Partial<Issue> = {};
    if (title) updates.title = title.trim();
    if (description) updates.description = description.trim();
    if (status) updates.status = status;
    if (priority) updates.priority = priority;
    if (assignedTo) updates.assignedTo = assignedTo;

    const updatedIssue = issueDb.update(id, updates);

    return NextResponse.json(
      {
        success: true,
        message: "Issue updated successfully",
        data: updatedIssue,
      } as ApiResponse<Issue>,
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating issue:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update issue",
      } as ApiResponse,
      { status: 500 },
    );
  }
}

// DELETE /api/issues/[id] - Delete an issue
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized - Please login",
        } as ApiResponse,
        { status: 401 },
      );
    }

    const { id } = await params;
    const issue = issueDb.findById(id);

    if (!issue) {
      return NextResponse.json(
        {
          success: false,
          error: "Issue not found",
        } as ApiResponse,
        { status: 404 },
      );
    }

    // Check if user owns this issue or is admin
    const requestUser = userDb.findById(user.userId);
    if (issue.userId !== user.userId && requestUser?.role !== "admin") {
      return NextResponse.json(
        {
          success: false,
          error: "Forbidden - You can only delete your own issues",
        } as ApiResponse,
        { status: 403 },
      );
    }

    // Delete the issue
    const deleted = issueDb.delete(id);

    if (!deleted) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to delete issue",
        } as ApiResponse,
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Issue deleted successfully",
      } as ApiResponse,
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting issue:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete issue",
      } as ApiResponse,
      { status: 500 },
    );
  }
}
