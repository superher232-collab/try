// src/app/api/kapal/route.js
import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET() {
  try {
    const kapal = await sql`
      SELECT id_kapal, nama_kapal, kapasitas_kargo, status_sistem
      FROM tb_kapal
      ORDER BY id_kapal
    `;
    return NextResponse.json({ success: true, data: kapal, total: kapal.length });
  } catch (error) {
    console.error('[API /api/kapal] Error:', error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
