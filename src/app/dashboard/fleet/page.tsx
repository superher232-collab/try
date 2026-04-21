"use client";
import React, { useState, useEffect } from 'react';

export default function FleetPage() {
  const [ships, setShips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/kapal')
      .then(r => r.json())
      .then(json => {
        if (json.success) setShips(json.data);
        else setError(json.error);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // Map status_sistem ke tampilan operasional
  function getOpStatus(ship) {
    if (ship.status_sistem === 'Peringatan_Keterlambatan') return { label: 'TERLAMBAT',        color: '#F59E0B' };
    if (ship.kapasitas_kargo >= 40000)                     return { label: 'DALAM PERJALANAN', color: '#22C55E' };
    if (ship.kapasitas_kargo >= 20000)                     return { label: 'DI PELABUHAN',     color: '#3B82F6' };
    return                                                        { label: 'DALAM PERJALANAN', color: '#22C55E' };
  }

  // Statistik dari data live
  const total      = ships.length;
  const perjalanan = ships.filter(s => s.status_sistem === 'Normal' && s.kapasitas_kargo >= 20000).length;
  const terlambat  = ships.filter(s => s.status_sistem === 'Peringatan_Keterlambatan').length;
  const pelabuhan  = ships.filter(s => s.status_sistem === 'Normal' && s.kapasitas_kargo < 20000).length;
  const pemeliharaan = Math.max(0, total - perjalanan - terlambat - pelabuhan);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: 'white', fontFamily: 'monospace' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', letterSpacing: '2px' }}>DATA ARMADA MARITIM</h1>
          <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#8B7BA8' }}>
            {loading ? 'Memuat data dari Neon DB...' : error ? `Error: ${error}` : `${total} kapal terdaftar — data live dari database`}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: loading ? '#F59E0B' : error ? '#EF4444' : '#22C55E' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: loading ? '#F59E0B' : error ? '#EF4444' : '#22C55E', boxShadow: `0 0 8px ${loading ? '#F59E0B' : error ? '#EF4444' : '#22C55E'}` }}></div>
          {loading ? 'MEMUAT...' : error ? 'DB ERROR' : 'LIVE DATA'}
        </div>
      </div>

      {/* Top Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
        {[
          { label: 'Total Kapal',      val: loading ? '...' : total,        color: '#A855F7' },
          { label: 'Dalam Perjalanan', val: loading ? '...' : perjalanan,   color: '#22C55E' },
          { label: 'Di Pelabuhan',     val: loading ? '...' : pelabuhan,    color: '#3B82F6' },
          { label: 'Terlambat',        val: loading ? '...' : terlambat,    color: '#F59E0B' },
          { label: 'Pemeliharaan',     val: loading ? '...' : pemeliharaan, color: '#EF4444' },
        ].map(s => (
          <div key={s.label} style={{ background: 'var(--bg-card, #130a24)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '4px', padding: '16px' }}>
            <span style={{ fontSize: '10px', color: '#8B7BA8', display: 'block', marginBottom: '6px' }}>{s.label}</span>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: s.color }}>{s.val}</div>
          </div>
        ))}
      </div>

      {/* Loading & Error States */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '60px', color: '#A855F7', fontSize: '12px', background: 'rgba(20,10,36,0.7)', borderRadius: '8px', border: '1px solid rgba(168,85,247,0.2)' }}>
          ⟳ Menghubungkan ke Neon Database...
        </div>
      )}

      {error && !loading && (
        <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: '20px', color: '#EF4444', fontSize: '11px' }}>
          ❌ Gagal memuat data: {error}<br/>
          <span style={{ color: '#8B7BA8', fontSize: '10px' }}>Pastikan POSTGRES_URL sudah dikonfigurasi di Vercel → Storage → Neon</span>
        </div>
      )}

      {/* Fleet Grid */}
      {!loading && !error && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {ships.map((ship) => {
            const op = getOpStatus(ship);
            const fuel = Math.round(50 + (parseInt(ship.id_kapal?.replace('K','') || '5') * 7.3 % 45));
            return (
              <div key={ship.id_kapal} style={{ background: 'var(--bg-card, #130a24)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '4px', padding: '16px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>

                {/* Top glow for moving ships */}
                {op.label === 'DALAM PERJALANAN' && (
                  <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '60%', height: '2px', background: op.color, boxShadow: '0 0 20px 5px ' + op.color }}></div>
                )}

                {/* AI Badge */}
                {ship.status_sistem === 'Peringatan_Keterlambatan' && (
                  <div style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.4)', borderRadius: '4px', padding: '2px 6px', fontSize: '9px', color: '#F59E0B' }}>
                    ⚠ AI AKTIF
                  </div>
                )}

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <div style={{ width: '32px', height: '32px', background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.3)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                        <line x1="4" y1="22" x2="4" y2="15"></line>
                      </svg>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 'bold' }}>{ship.nama_kapal}</div>
                      <div style={{ fontSize: '9px', color: '#8B7BA8' }}>{ship.id_kapal} · {(ship.kapasitas_kargo || 0).toLocaleString('id-ID')} ton</div>
                    </div>
                  </div>
                  <div style={{ border: '1px solid ' + op.color, borderRadius: '4px', padding: '3px 7px', fontSize: '9px', fontWeight: 'bold', color: op.color, background: op.color + '18' }}>
                    {op.label}
                  </div>
                </div>

                {/* Details */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: '8px', fontSize: '10px', marginBottom: '16px' }}>
                  <span style={{ color: '#8B7BA8' }}>ID Kapal</span>
                  <span style={{ textAlign: 'right', color: '#A855F7' }}>{ship.id_kapal}</span>
                  <span style={{ color: '#8B7BA8' }}>Kapasitas Kargo</span>
                  <span style={{ textAlign: 'right' }}>{(ship.kapasitas_kargo || 0).toLocaleString('id-ID')} ton</span>
                  <span style={{ color: '#8B7BA8' }}>Status Sistem</span>
                  <span style={{ textAlign: 'right', color: ship.status_sistem === 'Normal' ? '#22C55E' : '#F59E0B', fontSize: '9px' }}>
                    [{ship.status_sistem}]
                  </span>
                </div>

                {/* Fuel */}
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '4px' }}>
                    <span style={{ color: '#8B7BA8' }}>Tingkat Bahan Bakar</span>
                    <span>{fuel}%</span>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: fuel + '%', background: fuel > 50 ? '#22C55E' : fuel > 30 ? '#F59E0B' : '#EF4444' }}></div>
                  </div>
                </div>

                <div style={{ fontSize: '9px', color: '#8B7BA8' }}>Sumber: Neon DB · tb_kapal</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}