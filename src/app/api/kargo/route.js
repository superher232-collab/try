// src/app/api/kargo/route.js
import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET() {
  try {
    const kargo = await sql`
      SELECT k.id_kargo, p.nama_perusahaan, kpl.nama_kapal, kpl.status_sistem,
             r.asal, r.tujuan, r.estimasi_hari, k.status_pengiriman
      FROM tb_kargo k
      JOIN tb_pelanggan p   ON k.id_pelanggan = p.id_pelanggan
      JOIN tb_kapal kpl     ON k.id_kapal     = kpl.id_kapal
      JOIN tb_rute r        ON k.id_rute      = r.id_rute
      ORDER BY k.id_kargo
    `;
    return NextResponse.json({ success: true, data: kargo });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
