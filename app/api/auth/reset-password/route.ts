import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { PasswordResetToken } from "@/models/PasswordResetToken";

import bcrypt from "bcryptjs";
import crypto from "crypto";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const token = body.token?.trim();
    const newPassword = body.newPassword;

    if (!token || !newPassword) {
      return NextResponse.json({error:"Reset token and new password are required"},{status: 400},
      );
    }

    /* Basic password validation */
    if (newPassword.length < 8) {
      return NextResponse.json({error:"Password must be at least 8 characters long"},{status: 400},
      );
    }

    /* Hash the raw token received from the URL */
    const tokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    /* Find the reset token */
    const resetToken = await PasswordResetToken.findOne({tokenHash});

    if (!resetToken) {
      return NextResponse.json({error: "Invalid or expired reset link"},{status: 400},
      );
    }

    /* Check whether token was already used */
    if (resetToken.used) {
      return NextResponse.json({error:"This reset link has already been used"},{status: 400},
      );
    }

    /* Check expiration */
    if (resetToken.expiresAt < new Date()) {
      await PasswordResetToken.deleteOne({
        _id: resetToken._id,
      });

      return NextResponse.json(
        { error: "This reset link has expired" },{ status: 400 },
      );
    }

    /* Find the user */
    const user = await User.findById(resetToken.userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" },{ status: 404 },
      );
    }

    /* Hash the new password */
    const hashedPassword = await bcrypt.hash(newPassword,10);

    /* Update password */
    user.password = hashedPassword;
    await user.save();

    /* Invalidate the reset token */
    await PasswordResetToken.deleteOne({_id: resetToken._id});

    return NextResponse.json({ success: true, message: "Password reset successfully"
    });
    
  } catch (error) {
    console.error("Reset password error:",error);
    return NextResponse.json(
      {error: "Failed to reset password"},{status: 500},
    );
  }
}