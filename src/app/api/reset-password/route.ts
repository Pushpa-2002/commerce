import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { Pool } from 'pg';

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "auth_system",
  password: "Pushpa@06",
  port: 5432,
});
export async function POST(req: Request) {
  const { token, newPassword } = await req.json();

  const res = await pool.query(
    `SELECT user_id FROM password_reset_tokens WHERE token = $1 AND expires_at > NOW() AND used = false`,
    [token]
  );

  if (res.rows.length === 0) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
  }

  const userId = res.rows[0].user_id;
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await pool.query(`UPDATE users SET password_hash = $1 WHERE id = $2`, [hashedPassword, userId]);
  await pool.query(`UPDATE password_reset_tokens SET used = true WHERE token = $1`, [token]);

  return NextResponse.json({ message: 'Password reset successful' });
}
