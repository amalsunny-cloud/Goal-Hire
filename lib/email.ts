import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);


interface SendPasswordResetEmailProps {
  to: string;
  resetUrl: string;
}
export async function sendPasswordResetEmail({ to, resetUrl }: SendPasswordResetEmailProps) {
    if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  if (!process.env.RESEND_FROM_EMAIL) {
    throw new Error("RESEND_FROM_EMAIL is not configured");
  }

  const { data, error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL,
    to,
    subject: "Reset your Goal-Hire password",
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        
        <h2>Reset your Goal-Hire password</h2>

        <p>
          We received a request to reset your Goal-Hire account password.
        </p>

        <p>
          Click the button below to create a new password.
        </p>

        <a
          href="${resetUrl}"
          style="
            display: inline-block;
            padding: 12px 20px;
            background: #000;
            color: #fff;
            text-decoration: none;
            border-radius: 6px;
          "
        >
          Reset Password
        </a>

        <p style="margin-top: 20px;">
          This link will expire in 30 minutes.
        </p>

        <p>
          If you did not request a password reset, you can safely ignore this email.
        </p>

      </div>
`
});

if(error){
    console.error("Resend email error:", error);
    throw new Error("Failed to send password reset email");
}
return data;
}