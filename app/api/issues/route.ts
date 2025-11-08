import { NextRequest, NextResponse } from "next/server";

interface Issue {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  coordinates: { lat: number; lng: number };
  photoUrl: string | null;
  status: string;
  priority: string;
  userId: string;
  votes: number;
  comments: any[];
  createdAt: string;
  updatedAt: string;
}

// Temporary in-memory storage (replace with database later)
const issues: Issue[] = [];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const category = searchParams.get("category");

    let filteredIssues = [...issues];

    // Filter by status if provided
    if (status) {
      filteredIssues = filteredIssues.filter(
        (issue) => issue.status === status,
      );
    }

    // Filter by category if provided
    if (category) {
      filteredIssues = filteredIssues.filter(
        (issue) => issue.category === category,
      );
    }

    return NextResponse.json(
      {
        issues: filteredIssues,
        total: filteredIssues.length,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching issues:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      category,
      location,
      coordinates,
      photoUrl,
      userId,
    } = body;

    // Validation
    if (!title || !description || !category || !location) {
      return NextResponse.json(
        { error: "Title, description, category, and location are required" },
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
      "other",
    ];
    if (!validCategories.includes(category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    // Create new issue
    const newIssue = {
      id: Date.now().toString(),
      title,
      description,
      category,
      location,
      coordinates: coordinates || { lat: 0, lng: 0 },
      photoUrl: photoUrl || null,
      status: "open",
      priority: "medium",
      userId: userId || "anonymous",
      votes: 0,
      comments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // TODO: Save to database
    issues.push(newIssue);

    return NextResponse.json(
      {
        message: "Issue reported successfully",
        issue: newIssue,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating issue:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
