import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";
import bcrypt from 'bcrypt';

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "auth_system",
  password: "Pushpa@06",
  port: 5432,
});

interface LoginRequestBody {
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    const { email, password }: LoginRequestBody = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
    }

    // Query user from DB by email
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM users WHERE email = $1", [email]);
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = result.rows[0];
    
  // Use bcrypt to compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
    }

    // Login successful — you can create session or JWT here

    return NextResponse.json({ message: "Login successful", userId: user.id });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
