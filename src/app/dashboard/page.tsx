"use client";
import React, { useState, useEffect } from 'react';

export default function RingkasanDashboard() {
  const [kapal, setKapal]   = useState([]);
  const [kargo, setKargo]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/kapal').then(r => r.json()),
      fetch('/api/kargo').then(r => r.json()),
    ]).then(([k, kg]) => {
      if (k.success)  setKapal(k.data);
      if (kg.success) setKargo(kg.data);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const total      = kapal.length;
  const terlambat  = kapal.filter(k => k.status_sistem === 'Peringatan_Keterlambatan').length;
  const normal     = kapal.filter(k => k.status_sistem === 'Normal').length;
  const transit    = kargo.filter(k => k.status_pengiriman === 'Sedang Transit').length;
  const tiba       = kargo.filter(k => k.status_pengiriman === 'Tiba').length;

  const val = (n) => loading ? '...' : n;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Secondary Nav */}
      <div style={{ display: 'flex', gap: '32px', borderBottom: '1px solid var(--border-purple, rgba(168, 85, 247, 0.2))', paddingBottom: '16px' }}>
        <div style={{ color: '#A855F7', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px' }}>Pelacakan geografis kapal</div>
        <div style={{ color: 'var(--text-muted, #8B7BA8)', fontSize: '12px', letterSpacing: '1px' }}>Tampilan Global</div>
        <div style={{ color: 'var(--text-muted, #8B7BA8)', fontSize: '12px', letterSpacing: '1px' }}>Tampilan Regional</div>
        <div style={{ color: 'var(--text-muted, #8B7BA8)', fontSize: '12px', letterSpacing: '1px' }}>Perencanaan Rute</div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: loading ? '#F59E0B' : '#22C55E' }}>
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: loading ? '#F59E0B' : '#22C55E' }}></div>
          {loading ? 'Memuat DB...' : 'LIVE DATA'}
        </div>
      </div>

      {/* Top 4 Stats — from DB */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {[
          { icon: <path d="M2 12h20M2 18h20M5 12V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path>, color: '#C084FC', num: val(total),     label: 'Total Kapal' },
          { icon: <><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></>,       color: '#22C55E', num: val(transit),   label: 'Sedang Transit' },
          { icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></>,  color: '#3B82F6', num: val(tiba),      label: 'Kargo Tiba' },
          { icon: <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></>, color: '#F59E0B', num: val(terlambat), label: 'Peringatan Aktif' },
        ].map((s, i) => (
          <div key={i} style={{ background: 'rgba(20, 10, 36, 0.7)', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '4px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={s.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
              <span style={{ fontSize: '24px', color: s.color, lineHeight: 1 }}>{s.num}</span>
            </div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted, #8B7BA8)' }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Middle Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>

        {/* Metrik Kinerja */}
        <div style={{ background: 'rgba(20, 10, 36, 0.7)', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '4px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ fontSize: '11px', fontWeight: 'bold', color: 'white', letterSpacing: '1px' }}>METRIK KINERJA — LIVE DATABASE</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[
              { label: 'Total Armada',      val: val(total),                                     color: '#C084FC', sub: 'kapal terdaftar' },
              { label: 'Status Normal',     val: val(normal),                                    color: '#22C55E', sub: 'kapal beroperasi' },
              { label: 'Perlu Perhatian',   val: val(terlambat),                                 color: '#F59E0B', sub: 'kapal peringatan' },
              { label: 'Total Kargo',       val: val(kargo.length),                              color: '#3B82F6', sub: 'pengiriman aktif' },
            ].map(m => (
              <div key={m.label} style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '4px' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted, #8B7BA8)', marginBottom: '8px' }}>{m.label}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '20px', color: m.color }}>{m.val}</span>
                  <span style={{ fontSize: '9px', color: '#8B7BA8' }}>{m.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Sistem */}
        <div style={{ background: 'rgba(20, 10, 36, 0.7)', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '4px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ fontSize: '11px', fontWeight: 'bold', color: 'white', letterSpacing: '1px' }}>STATUS SISTEM</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'Koneksi Neon DB',    status: loading ? 'Menghubungkan' : 'Aktif', color: loading ? '#F59E0B' : '#22C55E' },
              { label: 'Pelacakan GPS',      status: 'Aktif',     color: '#22C55E' },
              { label: 'Komunikasi Kapal',   status: 'Aktif',     color: '#22C55E' },
              { label: 'Modul AI Diagnostik',status: 'Aktif',     color: '#22C55E' },
              { label: 'Sistem Cuaca',       status: 'Peringatan',color: '#F59E0B' },
            ].map(s => (
              <div key={s.label} style={{ background: 'rgba(0,0,0,0.3)', padding: '10px 12px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-muted, #8B7BA8)' }}>{s.label}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: s.color, boxShadow: `0 0 6px ${s.color}` }}></div>
                  <span style={{ fontSize: '9px', color: s.color }}>{s.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>

        {/* Kargo list dari DB */}
        <div style={{ background: 'rgba(20, 10, 36, 0.7)', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '4px', padding: '24px' }}>
          <div style={{ fontSize: '11px', fontWeight: 'bold', color: 'white', letterSpacing: '1px', marginBottom: '16px' }}>DATA KARGO — LIVE</div>
          {loading ? (
            <div style={{ color: '#8B7BA8', fontSize: '11px', textAlign: 'center', padding: '20px' }}>Memuat data kargo...</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(168,85,247,0.2)' }}>
                    {['Kapal', 'Rute', 'Status Pengiriman'].map(h => (
                      <th key={h} style={{ textAlign: 'left', padding: '6px 10px', color: '#A855F7', fontWeight: 'bold' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {kargo.slice(0, 6).map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '8px 10px', color: 'white', fontWeight: 'bold' }}>{row.nama_kapal}</td>
                      <td style={{ padding: '8px 10px', color: '#8B7BA8' }}>{row.asal} → {row.tujuan}</td>
                      <td style={{ padding: '8px 10px' }}>
                        <span style={{ fontSize: '9px', padding: '2px 7px', borderRadius: '4px', fontWeight: 'bold',
                          color: row.status_pengiriman === 'Tiba' ? '#22C55E' : '#3B82F6',
                          background: row.status_pengiriman === 'Tiba' ? 'rgba(34,197,94,0.1)' : 'rgba(59,130,246,0.1)',
                          border: `1px solid ${row.status_pengiriman === 'Tiba' ? 'rgba(34,197,94,0.3)' : 'rgba(59,130,246,0.3)'}`
                        }}>{row.status_pengiriman}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Aktivitas Kapal dari DB */}
        <div style={{ background: 'rgba(20, 10, 36, 0.7)', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '4px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ fontSize: '11px', fontWeight: 'bold', color: 'white', letterSpacing: '1px', marginBottom: '4px' }}>AKTIVITAS KAPAL</div>
          {loading ? (
            <div style={{ color: '#8B7BA8', fontSize: '11px', textAlign: 'center', padding: '20px' }}>...</div>
          ) : (
            kapal.slice(0, 4).map(k => (
              <div key={k.id_kapal} style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                  <span style={{ fontSize: '9px', color: 'white', fontWeight: 'bold' }}>{k.nama_kapal}</span>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: k.status_sistem === 'Normal' ? '#22C55E' : '#F59E0B' }}></div>
                </div>
                <span style={{ fontSize: '8px', color: k.status_sistem === 'Normal' ? '#4ADE80' : '#F59E0B' }}>
                  [{k.status_sistem}]
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
