import { NextRequest, NextResponse } from "next/server";
import { commentDb, issueDb, userDb } from "@/lib/db";
import { getUserFromRequest } from "@/lib/auth";
import { ApiResponse, CreateCommentRequest, Comment } from "@/lib/types";

// GET /api/issues/[id]/comments - Get all comments for an issue
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    // Check if issue exists
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

    const comments = commentDb.findByIssueId(id);

    return NextResponse.json(
      {
        success: true,
        data: {
          comments,
          total: comments.length,
        },
      } as ApiResponse,
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch comments",
      } as ApiResponse,
      { status: 500 },
    );
  }
}

// POST /api/issues/[id]/comments - Add a comment to an issue
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized - Please login to comment",
        } as ApiResponse,
        { status: 401 },
      );
    }

    const { id } = await params;

    // Check if issue exists
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

    const body: CreateCommentRequest = await request.json();
    const { content } = body;

    // Validation
    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Comment content is required",
        } as ApiResponse,
        { status: 400 },
      );
    }

    if (content.trim().length < 2) {
      return NextResponse.json(
        {
          success: false,
          error: "Comment must be at least 2 characters long",
        } as ApiResponse,
        { status: 400 },
      );
    }

    if (content.length > 1000) {
      return NextResponse.json(
        {
          success: false,
          error: "Comment must not exceed 1000 characters",
        } as ApiResponse,
        { status: 400 },
      );
    }

    // Get user details
    const userData = userDb.findById(user.userId);
    if (!userData) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found",
        } as ApiResponse,
        { status: 404 },
      );
    }

    // Create comment
    const newComment = commentDb.create({
      issueId: id,
      userId: user.userId,
      userName: userData.name,
      content: content.trim(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Comment added successfully",
        data: newComment,
      } as ApiResponse<Comment>,
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to add comment",
      } as ApiResponse,
      { status: 500 },
    );
  }
}

// DELETE /api/issues/[id]/comments?commentId=xxx - Delete a comment
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

    const { searchParams } = new URL(request.url);
    const commentId = searchParams.get("commentId");

    if (!commentId) {
      return NextResponse.json(
        {
          success: false,
          error: "Comment ID is required",
        } as ApiResponse,
        { status: 400 },
      );
    }

    const comment = commentDb.findById(commentId);
    if (!comment) {
      return NextResponse.json(
        {
          success: false,
          error: "Comment not found",
        } as ApiResponse,
        { status: 404 },
      );
    }

    // Check if user owns this comment or is admin
    const requestUser = userDb.findById(user.userId);
    if (comment.userId !== user.userId && requestUser?.role !== "admin") {
      return NextResponse.json(
        {
          success: false,
          error: "Forbidden - You can only delete your own comments",
        } as ApiResponse,
        { status: 403 },
      );
    }

    const deleted = commentDb.delete(commentId);
    if (!deleted) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to delete comment",
        } as ApiResponse,
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Comment deleted successfully",
      } as ApiResponse,
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete comment",
      } as ApiResponse,
      { status: 500 },
    );
  }
}
