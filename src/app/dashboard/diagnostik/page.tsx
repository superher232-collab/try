"use client";
import React, { useState } from 'react';

// =====================================================
// MODUL 1 — LOGIKA EVALUASI STATUS ARMADA
// =====================================================
type FleetStatus = 'Normal' | 'Peringatan_Keterlambatan';

interface DiagnosticResult {
  status: FleetStatus;
  kapal: string;
  tindakan?: string;
  peringatan?: string;
  info?: string;
  timestamp: string;
}

function evaluasiStatusArmada(namaKapal: string, status: FleetStatus): DiagnosticResult {
  const now = new Date();
  const timestamp = now.toLocaleString('id-ID', {
    day: '2-digit', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  });

  if (status === 'Peringatan_Keterlambatan') {
    return {
      status: 'Peringatan_Keterlambatan',
      kapal: namaKapal,
      tindakan: 'Tingkatkan daya propulsi sebesar +10% → evaluasi respons selama 15 menit → jika keterlambatan masih terjadi, tingkatkan +10% tambahan. Jangan lakukan lonjakan daya secara langsung.',
      peringatan: 'Periksa Batas_Aman_Konsumsi_Energi sebelum menaikkan daya.',
      timestamp
    };
  }

  return {
    status: 'Normal',
    kapal: namaKapal,
    info: 'Armada berjalan sesuai jadwal. Tidak ada tindakan diperlukan.',
    timestamp
  };
}

// Data armada kapal Indonesia
const dataArmada = [
  { id: 'K001', nama: 'KM NUSANTARA JAYA',       status: 'Normal' as FleetStatus,                  rute: 'Selat Makassar → Pelabuhan Makassar' },
  { id: 'K002', nama: 'KM BAHARI SENTOSA',        status: 'Normal' as FleetStatus,                  rute: 'Pelabuhan Tanjung Priok → Jakarta'    },
  { id: 'K003', nama: 'KM ARJUNA PERKASA',        status: 'Peringatan_Keterlambatan' as FleetStatus, rute: 'Laut Jawa → Pelabuhan Tanjung Perak'  },
  { id: 'K004', nama: 'KRI DIPONEGORO',           status: 'Normal' as FleetStatus,                  rute: 'Pelabuhan Belawan → Medan'            },
  { id: 'K005', nama: 'KM SRIWIJAYA AGUNG',       status: 'Normal' as FleetStatus,                  rute: 'Laut Banda → Pelabuhan Sorong'        },
  { id: 'K006', nama: 'KM BUKIT BARISAN',         status: 'Normal' as FleetStatus,                  rute: 'Selat Sunda → Pelabuhan Bakauheni'    },
  { id: 'K007', nama: 'KM RAJAWALI NUSANTARA',    status: 'Peringatan_Keterlambatan' as FleetStatus, rute: 'Pelabuhan Pontianak → Pelabuhan Kumai' },
  { id: 'K008', nama: 'KRI SULTAN HASANUDDIN',    status: 'Normal' as FleetStatus,                  rute: 'Laut Sulawesi → Pelabuhan Bitung'     },
];

export default function DiagnostikPage() {
  const [selectedKapal, setSelectedKapal] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<FleetStatus>('Normal');
  const [hasManual, setHasManual] = useState(false);
  const [manualNama, setManualNama] = useState('');
  const [hasil, setHasil] = useState<DiagnosticResult | null>(null);
  const [log, setLog] = useState<DiagnosticResult[]>([]);

  function jalankanDiagnostik() {
    const namaKapal = hasManual ? manualNama.trim() : selectedKapal;
    if (!namaKapal) return;
    const result = evaluasiStatusArmada(namaKapal, selectedStatus);
    setHasil(result);
    setLog(prev => [result, ...prev].slice(0, 10));
  }

  function handlePilihKapal(id: string) {
    const kapal = dataArmada.find(k => k.id === id);
    if (kapal) {
      setSelectedKapal(kapal.nama);
      setSelectedStatus(kapal.status);
      setHasManual(false);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', color: 'white', fontFamily: 'monospace' }}>

      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(168, 85, 247, 0.2)', paddingBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <div style={{ width: '36px', height: '36px', background: 'rgba(168, 85, 247, 0.15)', border: '1px solid rgba(168, 85, 247, 0.4)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', letterSpacing: '2px', color: 'white' }}>MODUL 1 — NAVIGASI OPERASIONAL</h1>
            <p style={{ margin: 0, fontSize: '11px', color: '#8B7BA8' }}>Panel Diagnostik & Evaluasi Status Armada Maritim</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span style={{ fontSize: '10px', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: '4px', padding: '2px 8px', color: '#22C55E' }}>● SISTEM AKTIF</span>
          <span style={{ fontSize: '10px', background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '4px', padding: '2px 8px', color: '#A855F7' }}>AI v2.0</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

        {/* Panel Input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Pilih Kapal dari Database */}
          <div style={{ background: 'rgba(20, 10, 36, 0.7)', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '8px', padding: '20px' }}>
            <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#A855F7', letterSpacing: '1px', marginBottom: '16px' }}>● INPUT STATUS ARMADA</div>

            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '10px', color: '#8B7BA8', display: 'block', marginBottom: '6px' }}>PILIH KAPAL DARI ARMADA</label>
              <select
                value={selectedKapal}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val) handlePilihKapal(val.split('|')[0]);
                }}
                style={{ width: '100%', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '4px', padding: '10px', color: 'white', fontSize: '11px', outline: 'none' }}
              >
                <option value="">-- Pilih Kapal --</option>
                {dataArmada.map(k => (
                  <option key={k.id} value={`${k.id}|${k.nama}`}>
                    {k.nama} [{k.status}]
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '12px 0', color: '#8B7BA8', fontSize: '10px' }}>
              <div style={{ flex: 1, height: '1px', background: 'rgba(168, 85, 247, 0.2)' }}></div>
              ATAU INPUT MANUAL
              <div style={{ flex: 1, height: '1px', background: 'rgba(168, 85, 247, 0.2)' }}></div>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '10px', color: '#8B7BA8', display: 'block', marginBottom: '6px' }}>NAMA KAPAL (MANUAL)</label>
              <input
                type="text"
                placeholder="Contoh: KM NUSANTARA JAYA"
                value={manualNama}
                onChange={(e) => { setManualNama(e.target.value); setHasManual(true); }}
                style={{ width: '100%', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '4px', padding: '10px', color: 'white', fontSize: '11px', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '10px', color: '#8B7BA8', display: 'block', marginBottom: '8px' }}>STATUS SISTEM KAPAL</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setSelectedStatus('Normal')}
                  style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold', fontFamily: 'monospace', transition: 'all 0.2s',
                    borderColor: selectedStatus === 'Normal' ? '#22C55E' : 'rgba(255,255,255,0.1)',
                    background: selectedStatus === 'Normal' ? 'rgba(34, 197, 94, 0.15)' : 'transparent',
                    color: selectedStatus === 'Normal' ? '#22C55E' : '#8B7BA8'
                  }}
                >
                  [Normal]
                </button>
                <button
                  onClick={() => setSelectedStatus('Peringatan_Keterlambatan')}
                  style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid', cursor: 'pointer', fontSize: '10px', fontWeight: 'bold', fontFamily: 'monospace', transition: 'all 0.2s',
                    borderColor: selectedStatus === 'Peringatan_Keterlambatan' ? '#F59E0B' : 'rgba(255,255,255,0.1)',
                    background: selectedStatus === 'Peringatan_Keterlambatan' ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
                    color: selectedStatus === 'Peringatan_Keterlambatan' ? '#F59E0B' : '#8B7BA8'
                  }}
                >
                  [Peringatan_Keterlambatan]
                </button>
              </div>
            </div>

            <button
              onClick={jalankanDiagnostik}
              style={{ width: '100%', padding: '12px', background: 'linear-gradient(90deg, #A855F7 0%, #7C3AED 100%)', border: 'none', borderRadius: '4px', color: 'white', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px', cursor: 'pointer', fontFamily: 'monospace', boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' }}
            >
              ▶ JALANKAN DIAGNOSTIK AI
            </button>
          </div>

          {/* Aturan Logika Evaluasi */}
          <div style={{ background: 'rgba(20, 10, 36, 0.7)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '8px', padding: '20px' }}>
            <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#A855F7', letterSpacing: '1px', marginBottom: '12px' }}>● ATURAN EVALUASI AKTIF</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '10px', color: '#8B7BA8' }}>
              <div style={{ background: 'rgba(34, 197, 94, 0.05)', border: '1px solid rgba(34, 197, 94, 0.2)', borderRadius: '4px', padding: '10px' }}>
                <span style={{ color: '#22C55E', fontWeight: 'bold' }}>STATUS [Normal]</span><br />
                Parameter daya optimal. Armada berjalan sesuai jadwal. Tidak ada tindakan diperlukan.
              </div>
              <div style={{ background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)', borderRadius: '4px', padding: '10px' }}>
                <span style={{ color: '#F59E0B', fontWeight: 'bold' }}>STATUS [Peringatan_Keterlambatan]</span><br />
                Protokol: +10% daya → evaluasi 15 menit → +10% lagi jika perlu.<br />
                <span style={{ color: '#EF4444' }}>⚠ Periksa Batas_Aman_Konsumsi_Energi.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Panel Output */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Hasil Diagnostik */}
          <div style={{ background: 'rgba(20, 10, 36, 0.7)', border: `1px solid ${hasil ? (hasil.status === 'Normal' ? 'rgba(34, 197, 94, 0.4)' : 'rgba(245, 158, 11, 0.4)') : 'rgba(168, 85, 247, 0.3)'}`, borderRadius: '8px', padding: '20px', minHeight: '280px' }}>
            <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#A855F7', letterSpacing: '1px', marginBottom: '16px' }}>● OUTPUT DIAGNOSTIK AI</div>

            {!hasil ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px', gap: '12px', color: '#8B7BA8' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
                <span style={{ fontSize: '11px' }}>Pilih kapal dan jalankan diagnostik untuk melihat hasil evaluasi AI.</span>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '11px' }}>
                {/* Format Output Modul 1 */}
                <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '4px', padding: '14px', borderLeft: `3px solid ${hasil.status === 'Normal' ? '#22C55E' : '#F59E0B'}` }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div>
                      <span style={{ color: '#8B7BA8' }}>STATUS: </span>
                      <span style={{ color: hasil.status === 'Normal' ? '#22C55E' : '#F59E0B', fontWeight: 'bold' }}>[{hasil.status}]</span>
                    </div>
                    <div>
                      <span style={{ color: '#8B7BA8' }}>KAPAL: </span>
                      <span style={{ color: 'white', fontWeight: 'bold' }}>{hasil.kapal}</span>
                    </div>
                    {hasil.tindakan && (
                      <div>
                        <span style={{ color: '#8B7BA8' }}>TINDAKAN: </span>
                        <span style={{ color: '#C084FC' }}>{hasil.tindakan}</span>
                      </div>
                    )}
                    {hasil.info && (
                      <div>
                        <span style={{ color: '#8B7BA8' }}>INFO: </span>
                        <span style={{ color: '#22C55E' }}>{hasil.info}</span>
                      </div>
                    )}
                    {hasil.peringatan && (
                      <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '4px', padding: '8px', marginTop: '4px' }}>
                        <span style={{ color: '#EF4444', fontWeight: 'bold' }}>⚠ PERINGATAN: </span>
                        <span style={{ color: '#FCA5A5' }}>{hasil.peringatan}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ fontSize: '10px', color: '#8B7BA8', textAlign: 'right' }}>
                  Diagnostik dilakukan: {hasil.timestamp}
                </div>
              </div>
            )}
          </div>

          {/* Log Riwayat Diagnostik */}
          <div style={{ background: 'rgba(20, 10, 36, 0.7)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '8px', padding: '20px', flex: 1 }}>
            <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#A855F7', letterSpacing: '1px', marginBottom: '12px' }}>● LOG RIWAYAT DIAGNOSTIK</div>
            {log.length === 0 ? (
              <div style={{ fontSize: '10px', color: '#8B7BA8', textAlign: 'center', padding: '20px' }}>Belum ada riwayat diagnostik.</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '200px', overflowY: 'auto' }}>
                {log.map((item, i) => (
                  <div key={i} style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '4px', padding: '8px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px' }}>
                    <span style={{ color: 'white' }}>{item.kapal}</span>
                    <span style={{ color: item.status === 'Normal' ? '#22C55E' : '#F59E0B' }}>[{item.status}]</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Daftar Status Seluruh Armada */}
      <div style={{ background: 'rgba(20, 10, 36, 0.7)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '8px', padding: '20px' }}>
        <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#A855F7', letterSpacing: '1px', marginBottom: '16px' }}>● RINGKASAN STATUS SELURUH ARMADA</div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(168, 85, 247, 0.2)' }}>
                <th style={{ textAlign: 'left', padding: '8px 12px', color: '#8B7BA8', fontWeight: 'normal' }}>ID</th>
                <th style={{ textAlign: 'left', padding: '8px 12px', color: '#8B7BA8', fontWeight: 'normal' }}>NAMA KAPAL</th>
                <th style={{ textAlign: 'left', padding: '8px 12px', color: '#8B7BA8', fontWeight: 'normal' }}>RUTE</th>
                <th style={{ textAlign: 'center', padding: '8px 12px', color: '#8B7BA8', fontWeight: 'normal' }}>STATUS SISTEM</th>
                <th style={{ textAlign: 'center', padding: '8px 12px', color: '#8B7BA8', fontWeight: 'normal' }}>AKSI</th>
              </tr>
            </thead>
            <tbody>
              {dataArmada.map((kapal) => (
                <tr key={kapal.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '10px 12px', color: '#A855F7' }}>{kapal.id}</td>
                  <td style={{ padding: '10px 12px', color: 'white', fontWeight: 'bold' }}>{kapal.nama}</td>
                  <td style={{ padding: '10px 12px', color: '#8B7BA8' }}>{kapal.rute}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                    <span style={{ 
                      fontSize: '10px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '4px',
                      color: kapal.status === 'Normal' ? '#22C55E' : '#F59E0B',
                      background: kapal.status === 'Normal' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                      border: `1px solid ${kapal.status === 'Normal' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`
                    }}>
                      [{kapal.status}]
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                    <button
                      onClick={() => { setSelectedKapal(kapal.nama); setSelectedStatus(kapal.status); setHasManual(false); }}
                      style={{ background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '4px', padding: '4px 10px', color: '#A855F7', fontSize: '10px', cursor: 'pointer', fontFamily: 'monospace' }}
                    >
                      Diagnosa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
