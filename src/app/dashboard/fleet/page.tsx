// src/app/dashboard/fleet/page.tsx
"use client";
import React from 'react';

export default function FleetPage() {
  const ships = [
    {
      id: 'K001',
      name: 'KM NUSANTARA JAYA',
      type: 'Kapal Kontainer',
      status: 'DALAM PERJALANAN',
      statusColor: '#22C55E',
      statusSistem: 'Normal',
      location: 'Selat Makassar',
      destination: 'Pelabuhan Makassar',
      eta: '2026-04-22 08:30',
      speed: '18 kn',
      cargo: 'Elektronik & Peralatan',
      fuel: 71.76,
      update: 'Baru saja'
    },
    {
      id: 'K002',
      name: 'KM BAHARI SENTOSA',
      type: 'Kapal Curah',
      status: 'DI PELABUHAN',
      statusColor: '#3B82F6',
      statusSistem: 'Normal',
      location: 'Pelabuhan Tanjung Priok',
      destination: 'Jakarta',
      eta: 'Tiba',
      speed: '0 kn',
      cargo: 'Batubara',
      fuel: 45,
      update: '5 menit lalu'
    },
    {
      id: 'K003',
      name: 'KM ARJUNA PERKASA',
      type: 'Kapal Tanker',
      status: 'TERLAMBAT',
      statusColor: '#F59E0B',
      statusSistem: 'Peringatan_Keterlambatan',
      location: 'Laut Jawa',
      destination: 'Pelabuhan Tanjung Perak',
      eta: '2026-04-21 14:00',
      speed: '10.3 kn',
      cargo: 'Minyak Mentah',
      fuel: 62,
      update: '1 menit lalu'
    },
    {
      id: 'K004',
      name: 'KRI DIPONEGORO',
      type: 'Kapal Pengawal',
      status: 'PEMELIHARAAN',
      statusColor: '#EF4444',
      statusSistem: 'Normal',
      location: 'Pelabuhan Belawan',
      destination: 'Medan',
      eta: 'Dalam Pemeliharaan',
      speed: '0 kn',
      cargo: '-',
      fuel: 88,
      update: '10 menit lalu'
    },
    {
      id: 'K005',
      name: 'KM SRIWIJAYA AGUNG',
      type: 'Kapal Kargo',
      status: 'DALAM PERJALANAN',
      statusColor: '#22C55E',
      statusSistem: 'Normal',
      location: 'Laut Banda',
      destination: 'Pelabuhan Sorong',
      eta: '2026-04-23 16:45',
      speed: '16.5 kn',
      cargo: 'Mesin & Peralatan',
      fuel: 48.30,
      update: 'Baru saja'
    },
    {
      id: 'K006',
      name: 'KM BUKIT BARISAN',
      type: 'Kapal Curah',
      status: 'DALAM PERJALANAN',
      statusColor: '#22C55E',
      statusSistem: 'Normal',
      location: 'Selat Sunda',
      destination: 'Pelabuhan Bakauheni',
      eta: '2026-04-22 22:15',
      speed: '15.6 kn',
      cargo: 'Beras & Pangan',
      fuel: 64.87,
      update: 'Baru saja'
    },
    {
      id: 'K007',
      name: 'KM RAJAWALI NUSANTARA',
      type: 'Kapal Tanker',
      status: 'DI PELABUHAN',
      statusColor: '#3B82F6',
      statusSistem: 'Peringatan_Keterlambatan',
      location: 'Pelabuhan Pontianak',
      destination: 'Pontianak',
      eta: 'Tiba',
      speed: '0 kn',
      cargo: 'LNG',
      fuel: 34,
      update: '7 menit lalu'
    },
    {
      id: 'K008',
      name: 'KRI SULTAN HASANUDDIN',
      type: 'Kapal Patroli',
      status: 'DALAM PERJALANAN',
      statusColor: '#22C55E',
      statusSistem: 'Normal',
      location: 'Laut Sulawesi',
      destination: 'Pelabuhan Bitung',
      eta: '2026-04-24 10:00',
      speed: '20.9 kn',
      cargo: 'Logistik TNI AL',
      fuel: 75.96,
      update: 'Baru saja'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', maxWidth: '1200px', margin: '0 auto', color: 'white', fontFamily: 'monospace' }}>
      
      {/* Top Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
        <div style={{ background: 'var(--bg-card, #130a24)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '4px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted, #8B7BA8)' }}>Total Kapal</span>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#A855F7' }}>8</div>
        </div>
        <div style={{ background: 'var(--bg-card, #130a24)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '4px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted, #8B7BA8)' }}>Dalam Perjalanan</span>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#22C55E' }}>4</div>
        </div>
        <div style={{ background: 'var(--bg-card, #130a24)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '4px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted, #8B7BA8)' }}>Di Pelabuhan</span>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3B82F6' }}>2</div>
        </div>
        <div style={{ background: 'var(--bg-card, #130a24)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '4px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted, #8B7BA8)' }}>Terlambat</span>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#F59E0B' }}>1</div>
        </div>
        <div style={{ background: 'var(--bg-card, #130a24)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '4px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted, #8B7BA8)' }}>Pemeliharaan</span>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#EF4444' }}>1</div>
        </div>
      </div>

      {/* Filter Bar */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted, #8B7BA8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}>
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            placeholder="Cari kapal KM/KRI..." 
            style={{ width: '100%', background: 'var(--bg-card, #130a24)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '4px', padding: '10px 10px 10px 36px', color: 'white', fontSize: '12px', outline: 'none', boxSizing: 'border-box' }} 
          />
        </div>
        <div style={{ background: 'var(--bg-card, #130a24)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '4px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted, #8B7BA8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
        </div>
        <div style={{ width: '150px', background: 'var(--bg-card, #130a24)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '4px', padding: '10px', fontSize: '11px', color: 'var(--text-muted, #8B7BA8)' }}>Semua Status</div>
        <div style={{ width: '150px', background: 'var(--bg-card, #130a24)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '4px', padding: '10px', fontSize: '11px', color: 'var(--text-muted, #8B7BA8)' }}>Semua Tipe</div>
      </div>

      {/* Fleet Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {ships.map((ship, index) => (
          <div key={index} style={{ background: 'var(--bg-card, #130a24)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '4px', padding: '16px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
            
            {/* Top Glow */}
            {ship.status === 'DALAM PERJALANAN' && (
              <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '60%', height: '2px', background: ship.statusColor, boxShadow: '0 0 20px 5px ' + ship.statusColor }}></div>
            )}

            {/* Status Sistem Badge */}
            {ship.statusSistem === 'Peringatan_Keterlambatan' && (
              <div style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.4)', borderRadius: '4px', padding: '2px 6px', fontSize: '9px', color: '#F59E0B' }}>
                ⚠ AI AKTIF
              </div>
            )}

            {/* Header: Icon, Name, Type, Status */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: '32px', height: '32px', background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                    <line x1="4" y1="22" x2="4" y2="15"></line>
                  </svg>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{ship.name}</span>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted, #8B7BA8)' }}>{ship.type}</span>
                </div>
              </div>
              <div style={{ border: '1px solid ' + ship.statusColor, borderRadius: '4px', padding: '4px 8px', display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(' + (ship.status === 'DALAM PERJALANAN' ? '34, 197, 94' : ship.status === 'DI PELABUHAN' ? '59, 130, 246' : ship.status === 'TERLAMBAT' ? '245, 158, 11' : '239, 68, 68') + ', 0.1)' }}>
                {ship.status === 'DALAM PERJALANAN' && <div style={{ width: '6px', height: '6px', background: ship.statusColor, borderRadius: '50%' }}></div>}
                {ship.status === 'DI PELABUHAN' && <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={ship.statusColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>}
                {ship.status === 'TERLAMBAT' && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={ship.statusColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>}
                {ship.status === 'PEMELIHARAAN' && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={ship.statusColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>}
                <span style={{ fontSize: '9px', fontWeight: 'bold', color: ship.statusColor }}>{ship.status}</span>
              </div>
            </div>

            {/* Details Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', rowGap: '12px', fontSize: '11px', marginBottom: '24px' }}>
              <span style={{ color: 'var(--text-muted, #8B7BA8)' }}>Lokasi</span>
              <span style={{ textAlign: 'right' }}>{ship.location}</span>
              
              <span style={{ color: 'var(--text-muted, #8B7BA8)' }}>Tujuan</span>
              <span style={{ textAlign: 'right' }}>{ship.destination}</span>
              
              <span style={{ color: 'var(--text-muted, #8B7BA8)' }}>Perkiraan Tiba</span>
              <span style={{ textAlign: 'right' }}>{ship.eta}</span>
              
              <span style={{ color: 'var(--text-muted, #8B7BA8)' }}>Kecepatan</span>
              <span style={{ textAlign: 'right', color: ship.speed !== '0 kn' ? '#22C55E' : 'white' }}>
                {ship.speed}
              </span>
              
              <span style={{ color: 'var(--text-muted, #8B7BA8)' }}>Muatan</span>
              <span style={{ textAlign: 'right' }}>{ship.cargo}</span>

              <span style={{ color: 'var(--text-muted, #8B7BA8)' }}>Status Sistem</span>
              <span style={{ textAlign: 'right', fontSize: '10px', color: ship.statusSistem === 'Normal' ? '#22C55E' : '#F59E0B' }}>
                [{ship.statusSistem}]
              </span>
            </div>

            {/* Fuel Level */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                <span style={{ color: 'var(--text-muted, #8B7BA8)' }}>Tingkat Bahan Bakar</span>
                <span>{ship.fuel}%</span>
              </div>
              <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: ship.fuel + '%', background: ship.fuel > 50 ? '#22C55E' : ship.fuel > 30 ? '#F59E0B' : '#EF4444' }}></div>
              </div>
            </div>

            {/* Footer */}
            <div style={{ fontSize: '10px', color: 'var(--text-muted, #8B7BA8)' }}>
              Pembaruan terakhir: {ship.update}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}