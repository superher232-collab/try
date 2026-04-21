// src/app/api/log-ai/route.js
import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET() {
  try {
    const logs = await sql`
      SELECT l.id_log, kpl.nama_kapal, kpl.status_sistem,
             l.waktu_diagnostik, l.rekomendasi_ai
      FROM tb_log_ai l
      JOIN tb_kapal kpl ON l.id_kapal = kpl.id_kapal
      ORDER BY l.waktu_diagnostik DESC
    `;
    return NextResponse.json({ success: true, data: logs });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
