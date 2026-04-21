// src/app/api/kapal/route.js
import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET() {
  try {
    const kapal = await sql`SELECT * FROM tb_kapal ORDER BY id_kapal`;
    return NextResponse.json({ success: true, data: kapal });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
