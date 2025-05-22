import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

import { randomBytes } from "crypto";
import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "auth_system",
  password: "Pushpa@06",
  port: 5432,
});

export async function POST(req: Request) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "khaniyasujita1@gmail.com", // your Gmail
      pass: "yehcwoopfkrfhese", // paste the 16-char app password (without spaces)
    },
  });
  const { email } = await req.json();

  try {
    // Check if the user exists
    const userResult = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );
    if (userResult.rowCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userId = userResult.rows[0].id;

    // Generate reset token and expiry time
    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 10); // 10 minutes from now

    // Insert into password_reset_tokens
    await pool.query(
      `
      INSERT INTO password_reset_tokens (user_id, token, expires_at)
      VALUES ($1, $2, $3)
    `,
      [userId, token, expiresAt]
    );

    const resetLink = `http://localhost:3000/reset?token=${token}`;

    await transporter.sendMail({
      to: email,
      subject: "Reset Your Password",
      html: `<p>You requested a password reset. Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    });

    return NextResponse.json({ success: true, message: "Reset link sent" });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
