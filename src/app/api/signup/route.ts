import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";
import bcrypt from 'bcrypt';

// Create a PostgreSQL connection pool
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "auth_system",
  password: "Pushpa@06",
  port: 5432,
});

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  try {
    // Check if email already exists
    const existing = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existing.rows.length > 0) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    await pool.query(
      "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)",
      [name, email, hashedPassword]
    );

    return NextResponse.json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
