import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  const res = await pool.query(
    `SELECT * FROM password_reset_tokens WHERE token = $1 AND expires_at > NOW() AND used = false`,
    [token]
  );

  if (res.rows.length === 0) {
    return NextResponse.json({ valid: false });
  }

  return NextResponse.json({ valid: true });
}
