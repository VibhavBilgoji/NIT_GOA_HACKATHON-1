import { NextRequest, NextResponse } from "next/server";
import { userDb } from "@/lib/db";
import {
  comparePasswords,
  validateEmail,
  generateToken,
  sanitizeUser,
} from "@/lib/auth";
import { LoginRequest, AuthResponse } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: "Email and password are required",
        } as AuthResponse,
        { status: 400 },
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid email address",
        } as AuthResponse,
        { status: 400 },
      );
    }

    // Find user by email
    const user = await userDb.findByEmail(email.toLowerCase());
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid email or password",
        } as AuthResponse,
        { status: 401 },
      );
    }

    // Compare passwords
    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid email or password",
        } as AuthResponse,
        { status: 401 },
      );
    }

    // Generate token
    const token = generateToken(user.id, user.email, user.role);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        user: sanitizeUser(user),
        token,
      } as AuthResponse,
      { status: 200 },
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error. Please try again later.",
      } as AuthResponse,
      { status: 500 },
    );
  }
}
