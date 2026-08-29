import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { PasswordResetToken } from "@/models/PasswordResetToken";
import { sendPasswordResetEmail } from "@/lib/email";

import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const email = body.email?.trim().toLowerCase();

    if (!email) {
      return NextResponse.json(
        {error: "Email is required"},
        {status: 400},
      );
    }

    const user = await User.findOne({email});

    if (!user) {
      return NextResponse.json({
        success: true,
        message:
          "If an account exists for this email, a password reset link has been sent.",
      });
    }

    /* Remove existing unused reset tokens for this user */
    await PasswordResetToken.deleteMany({
      userId: user._id,
      used: false,
    });

    /* Generate a cryptographically secure random token */
    const rawToken = crypto.randomBytes(32).toString("hex");

    /* Hash the token before storing it */
    const tokenHash = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    /* Token expires after 30 minutes */
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

    await PasswordResetToken.create({
      userId: user._id,
      tokenHash,
      expiresAt,
      used: false,
    });

    /* Construct the reset URL */
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const resetUrl = `${appUrl}/auth/reset-password?token=${rawToken}`;

    /* Send email */
    await sendPasswordResetEmail({to: user.email, resetUrl});

    return NextResponse.json({
      success: true,
      message:"If an account exists for this email, a password reset link has been sent."
    });
  } catch (error) {
    console.error("Forgot password error:",error);
    return NextResponse.json(
      {error:"Unable to process password reset request"},{status: 500},
    );
  }
}