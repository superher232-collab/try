"use client";
import React, { useState } from 'react';

// =====================================================
// MODUL 2 — GENERATOR BASIS DATA LOKAL INDONESIA
// =====================================================

// ─── SQL INSERT Queries ───────────────────────────────────────────────────────
const sqlTbKapal = `-- ╔══════════════════════════════════════════════════════════════╗
-- ║          TABEL: tb_kapal — Data Armada Maritim Indonesia          ║
-- ║     status_sistem: 'Normal' | 'Peringatan_Keterlambatan'          ║
-- ╚══════════════════════════════════════════════════════════════╝
INSERT INTO tb_kapal (id_kapal, nama_kapal, kapasitas_kargo, status_sistem) VALUES
('K001', 'KM NUSANTARA JAYA',       45000, 'Normal'),
('K002', 'KM BAHARI SENTOSA',       32000, 'Normal'),
('K003', 'KM ARJUNA PERKASA',       28000, 'Peringatan_Keterlambatan'),
('K004', 'KRI DIPONEGORO',          15000, 'Normal'),
('K005', 'KM SRIWIJAYA AGUNG',      51000, 'Normal'),
('K006', 'KM BUKIT BARISAN',        39000, 'Normal'),
('K007', 'KM RAJAWALI NUSANTARA',   22000, 'Peringatan_Keterlambatan'),
('K008', 'KRI SULTAN HASANUDDIN',   18000, 'Normal');`;

const sqlTbRute = `-- ╔══════════════════════════════════════════════════════════════╗
-- ║       TABEL: tb_rute — Rute Pelabuhan Nyata Indonesia            ║
-- ╚══════════════════════════════════════════════════════════════╝
INSERT INTO tb_rute (id_rute, asal, tujuan, estimasi_hari) VALUES
('R001', 'Pelabuhan Tanjung Priok',  'Pelabuhan Tanjung Perak',  2),
('R002', 'Pelabuhan Belawan',        'Pelabuhan Makassar',        5),
('R003', 'Pelabuhan Bakauheni',      'Pelabuhan Merak',           1),
('R004', 'Pelabuhan Sorong',         'Pelabuhan Bitung',          3),
('R005', 'Pelabuhan Pontianak',      'Pelabuhan Banjarmasin',     2),
('R006', 'Pelabuhan Tanjung Perak',  'Pelabuhan Kupang',          4),
('R007', 'Pelabuhan Makassar',       'Pelabuhan Ambon',           3),
('R008', 'Pelabuhan Bitung',         'Pelabuhan Sorong',          2);`;

const sqlTbPelanggan = `-- ╔══════════════════════════════════════════════════════════════╗
-- ║    TABEL: tb_pelanggan — Perusahaan Pengirim Kargo Indonesia      ║
-- ╚══════════════════════════════════════════════════════════════╝
INSERT INTO tb_pelanggan (id_pelanggan, nama_perusahaan, kontak_perusahaan) VALUES
('P001', 'PT Maju Bersama Nusantara',    '021-5566-7788'),
('P002', 'PT Karya Bahari Sentosa',       '031-4433-2211'),
('P003', 'PT Segara Wira Logistics',      '061-3322-1100'),
('P004', 'PT Tirta Khatulistiwa Trans',   '0561-8877-6655'),
('P005', 'PT Samudra Lestari Mandiri',    '0411-9988-7766');`;

const sqlTbKargo = `-- ╔══════════════════════════════════════════════════════════════╗
-- ║         TABEL: tb_kargo — Data Pengiriman Aktif                  ║
-- ║    status_pengiriman: 'Sedang Transit' | 'Tiba'                   ║
-- ║    FK: id_pelanggan → tb_pelanggan, id_kapal → tb_kapal          ║
-- ║         id_rute → tb_rute                                        ║
-- ╚══════════════════════════════════════════════════════════════╝
INSERT INTO tb_kargo (id_kargo, id_pelanggan, id_kapal, id_rute, status_pengiriman) VALUES
('C001', 'P001', 'K001', 'R001', 'Sedang Transit'),
('C002', 'P002', 'K002', 'R002', 'Tiba'),
('C003', 'P003', 'K003', 'R003', 'Sedang Transit'),
('C004', 'P004', 'K005', 'R004', 'Sedang Transit'),
('C005', 'P005', 'K006', 'R005', 'Tiba'),
('C006', 'P001', 'K007', 'R006', 'Sedang Transit'),
('C007', 'P002', 'K008', 'R007', 'Sedang Transit'),
('C008', 'P003', 'K004', 'R008', 'Tiba');`;

const sqlTbLogAI = `-- ╔══════════════════════════════════════════════════════════════╗
-- ║   TABEL: tb_log_ai — Riwayat Diagnostik & Rekomendasi AI         ║
-- ║   rekomendasi_ai mencerminkan output Modul 1 sesuai status kapal  ║
-- ║   FK: id_kapal → tb_kapal                                        ║
-- ╚══════════════════════════════════════════════════════════════╝
INSERT INTO tb_log_ai (id_log, id_kapal, waktu_diagnostik, rekomendasi_ai) VALUES
('L001', 'K001', '2026-04-21 08:00:00',
  'STATUS: [Normal] | KAPAL: KM NUSANTARA JAYA | INFO: Armada berjalan sesuai jadwal. Tidak ada tindakan diperlukan.'),
('L002', 'K002', '2026-04-21 08:05:00',
  'STATUS: [Normal] | KAPAL: KM BAHARI SENTOSA | INFO: Armada berjalan sesuai jadwal. Tidak ada tindakan diperlukan.'),
('L003', 'K003', '2026-04-21 08:10:00',
  'STATUS: [Peringatan_Keterlambatan] | KAPAL: KM ARJUNA PERKASA | TINDAKAN: Tingkatkan daya propulsi sebesar +10% → evaluasi respons selama 15 menit → jika keterlambatan masih terjadi, tingkatkan +10% tambahan | PERINGATAN: Periksa Batas_Aman_Konsumsi_Energi sebelum menaikkan daya.'),
('L004', 'K004', '2026-04-21 08:15:00',
  'STATUS: [Normal] | KAPAL: KRI DIPONEGORO | INFO: Armada berjalan sesuai jadwal. Tidak ada tindakan diperlukan.'),
('L005', 'K005', '2026-04-21 08:20:00',
  'STATUS: [Normal] | KAPAL: KM SRIWIJAYA AGUNG | INFO: Armada berjalan sesuai jadwal. Tidak ada tindakan diperlukan.'),
('L006', 'K006', '2026-04-21 08:25:00',
  'STATUS: [Normal] | KAPAL: KM BUKIT BARISAN | INFO: Armada berjalan sesuai jadwal. Tidak ada tindakan diperlukan.'),
('L007', 'K007', '2026-04-21 08:30:00',
  'STATUS: [Peringatan_Keterlambatan] | KAPAL: KM RAJAWALI NUSANTARA | TINDAKAN: Tingkatkan daya propulsi sebesar +10% → evaluasi respons selama 15 menit → jika keterlambatan masih terjadi, tingkatkan +10% tambahan | PERINGATAN: Periksa Batas_Aman_Konsumsi_Energi sebelum menaikkan daya.'),
('L008', 'K008', '2026-04-21 08:35:00',
  'STATUS: [Normal] | KAPAL: KRI SULTAN HASANUDDIN | INFO: Armada berjalan sesuai jadwal. Tidak ada tindakan diperlukan.');`;

const sqlCreateTables = `-- ╔══════════════════════════════════════════════════════════════╗
-- ║              DEFINISI TABEL (CREATE TABLE)                       ║
-- ║    Jalankan ini SEBELUM INSERT INTO di Neon DB Vercel            ║
-- ╚══════════════════════════════════════════════════════════════╝

CREATE TABLE IF NOT EXISTS tb_kapal (
  id_kapal        VARCHAR(10) PRIMARY KEY,
  nama_kapal      VARCHAR(100) NOT NULL,
  kapasitas_kargo INT NOT NULL,
  status_sistem   VARCHAR(30) CHECK (status_sistem IN ('Normal', 'Peringatan_Keterlambatan'))
);

CREATE TABLE IF NOT EXISTS tb_rute (
  id_rute       VARCHAR(10) PRIMARY KEY,
  asal          VARCHAR(100) NOT NULL,
  tujuan        VARCHAR(100) NOT NULL,
  estimasi_hari INT NOT NULL
);

CREATE TABLE IF NOT EXISTS tb_pelanggan (
  id_pelanggan      VARCHAR(10) PRIMARY KEY,
  nama_perusahaan   VARCHAR(100) NOT NULL,
  kontak_perusahaan VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS tb_kargo (
  id_kargo          VARCHAR(10) PRIMARY KEY,
  id_pelanggan      VARCHAR(10) REFERENCES tb_pelanggan(id_pelanggan),
  id_kapal          VARCHAR(10) REFERENCES tb_kapal(id_kapal),
  id_rute           VARCHAR(10) REFERENCES tb_rute(id_rute),
  status_pengiriman VARCHAR(20) CHECK (status_pengiriman IN ('Sedang Transit', 'Tiba'))
);

CREATE TABLE IF NOT EXISTS tb_log_ai (
  id_log            VARCHAR(10) PRIMARY KEY,
  id_kapal          VARCHAR(10) REFERENCES tb_kapal(id_kapal),
  waktu_diagnostik  TIMESTAMP NOT NULL,
  rekomendasi_ai    TEXT NOT NULL
);`;

// ─── Tutorial .env ────────────────────────────────────────────────────────────
const tutorialEnv = `# ╔══════════════════════════════════════════════════════════════╗
# ║      TUTORIAL PENERAPAN DATABASE NEON VERCEL (.env)              ║
# ╚══════════════════════════════════════════════════════════════╝

# LANGKAH 1: Buat Proyek di Neon (neon.tech)
# - Daftar di https://neon.tech (gratis)
# - Buat project baru → salin Connection String

# LANGKAH 2: Isi file .env.local di root proyek Next.js
POSTGRES_URL="postgresql://user:password@host/dbname?sslmode=require"
POSTGRES_PRISMA_URL="postgresql://user:password@host/dbname?sslmode=require&pgbouncer=true&connect_timeout=15"
POSTGRES_URL_NO_SSL="postgresql://user:password@host/dbname"
POSTGRES_URL_NON_POOLING="postgresql://user:password@host/dbname?sslmode=require"
POSTGRES_USER="your_username"
POSTGRES_HOST="your_neon_host"
POSTGRES_PASSWORD="your_password"
POSTGRES_DATABASE="your_database"

# LANGKAH 3: Install dependensi Neon/Postgres
# npm install @neondatabase/serverless
# atau: npm install @vercel/postgres

# LANGKAH 4: Buat file koneksi (lib/db.ts)
# import { neon } from '@neondatabase/serverless';
# const sql = neon(process.env.POSTGRES_URL!);
# export default sql;

# LANGKAH 5: Jalankan query CREATE TABLE lalu INSERT INTO
# melalui Neon SQL Editor atau via route API Next.js

# LANGKAH 6: Deploy ke Vercel
# - Push ke GitHub → Connect di vercel.com
# - Tambahkan Environment Variables di Vercel Dashboard
# - Salin semua variabel dari .env.local

# ⚠ PENTING: Jangan commit file .env.local ke Git!
# Tambahkan ke .gitignore: .env.local`;

// ─── Tabel Preview Data ───────────────────────────────────────────────────────
const previewKapal = [
  { id: 'K001', nama: 'KM NUSANTARA JAYA',    kapasitas: '45.000 ton', status: 'Normal' },
  { id: 'K002', nama: 'KM BAHARI SENTOSA',     kapasitas: '32.000 ton', status: 'Normal' },
  { id: 'K003', nama: 'KM ARJUNA PERKASA',     kapasitas: '28.000 ton', status: 'Peringatan_Keterlambatan' },
  { id: 'K004', nama: 'KRI DIPONEGORO',        kapasitas: '15.000 ton', status: 'Normal' },
  { id: 'K005', nama: 'KM SRIWIJAYA AGUNG',    kapasitas: '51.000 ton', status: 'Normal' },
  { id: 'K006', nama: 'KM BUKIT BARISAN',      kapasitas: '39.000 ton', status: 'Normal' },
  { id: 'K007', nama: 'KM RAJAWALI NUSANTARA', kapasitas: '22.000 ton', status: 'Peringatan_Keterlambatan' },
  { id: 'K008', nama: 'KRI SULTAN HASANUDDIN', kapasitas: '18.000 ton', status: 'Normal' },
];

const previewRute = [
  { id: 'R001', asal: 'Tanjung Priok',  tujuan: 'Tanjung Perak', hari: '2' },
  { id: 'R002', asal: 'Belawan',        tujuan: 'Makassar',       hari: '5' },
  { id: 'R003', asal: 'Bakauheni',      tujuan: 'Merak',          hari: '1' },
  { id: 'R004', asal: 'Sorong',         tujuan: 'Bitung',         hari: '3' },
  { id: 'R005', asal: 'Pontianak',      tujuan: 'Banjarmasin',    hari: '2' },
  { id: 'R006', asal: 'Tanjung Perak',  tujuan: 'Kupang',         hari: '4' },
  { id: 'R007', asal: 'Makassar',       tujuan: 'Ambon',          hari: '3' },
  { id: 'R008', asal: 'Bitung',         tujuan: 'Sorong',         hari: '2' },
];

const tabs = [
  { id: 'create', label: 'CREATE TABLE' },
  { id: 'kapal',  label: 'tb_kapal' },
  { id: 'rute',   label: 'tb_rute' },
  { id: 'pelanggan', label: 'tb_pelanggan' },
  { id: 'kargo',  label: 'tb_kargo' },
  { id: 'log_ai', label: 'tb_log_ai' },
  { id: 'env',    label: 'Tutorial .env' },
];

function getSql(tab: string) {
  const map: Record<string, string> = {
    create:     sqlCreateTables,
    kapal:      sqlTbKapal,
    rute:       sqlTbRute,
    pelanggan:  sqlTbPelanggan,
    kargo:      sqlTbKargo,
    log_ai:     sqlTbLogAI,
    env:        tutorialEnv,
  };
  return map[tab] ?? '';
}

export default function GeneratorPage() {
  const [activeTab, setActiveTab] = useState('create');
  const [copied, setCopied]       = useState(false);
  const [activePreview, setActivePreview] = useState('kapal');

  function handleCopy() {
    navigator.clipboard.writeText(getSql(activeTab));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', color: 'white', fontFamily: 'monospace' }}>

      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(168, 85, 247, 0.2)', paddingBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <div style={{ width: '36px', height: '36px', background: 'rgba(168, 85, 247, 0.15)', border: '1px solid rgba(168, 85, 247, 0.4)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
            </svg>
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', letterSpacing: '2px', color: 'white' }}>MODUL 2 — GENERATOR BASIS DATA</h1>
            <p style={{ margin: 0, fontSize: '11px', color: '#8B7BA8' }}>Dummy Data Lokal Indonesia — Neon DB Vercel (INSERT INTO)</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span style={{ fontSize: '10px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '4px', padding: '2px 8px', color: '#3B82F6' }}>PostgreSQL / Neon</span>
          <span style={{ fontSize: '10px', background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '4px', padding: '2px 8px', color: '#A855F7' }}>5 Tabel Relasional</span>
          <span style={{ fontSize: '10px', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: '4px', padding: '2px 8px', color: '#22C55E' }}>FK Konsisten</span>
        </div>
      </div>

      {/* SQL Query Viewer */}
      <div style={{ background: 'rgba(20, 10, 36, 0.7)', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '8px', overflow: 'hidden' }}>
        {/* Tab Bar */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(168, 85, 247, 0.2)', overflowX: 'auto' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{ padding: '10px 16px', background: activeTab === tab.id ? 'rgba(168, 85, 247, 0.15)' : 'transparent', borderBottom: activeTab === tab.id ? '2px solid #A855F7' : '2px solid transparent', border: 'none', color: activeTab === tab.id ? '#A855F7' : '#8B7BA8', fontSize: '11px', cursor: 'pointer', fontFamily: 'monospace', whiteSpace: 'nowrap', transition: 'all 0.2s' }}
            >
              {tab.label}
            </button>
          ))}
          <div style={{ flex: 1 }}></div>
          <button
            onClick={handleCopy}
            style={{ padding: '8px 16px', background: copied ? 'rgba(34, 197, 94, 0.15)' : 'rgba(168, 85, 247, 0.1)', border: 'none', borderLeft: '1px solid rgba(168, 85, 247, 0.2)', color: copied ? '#22C55E' : '#A855F7', fontSize: '11px', cursor: 'pointer', fontFamily: 'monospace', transition: 'all 0.2s' }}
          >
            {copied ? '✓ TERSALIN' : '⎘ SALIN SQL'}
          </button>
        </div>
        {/* SQL Content */}
        <div style={{ padding: '20px', overflowX: 'auto', maxHeight: '400px', overflowY: 'auto' }}>
          <pre style={{ margin: 0, fontSize: '11px', lineHeight: '1.7', color: '#C7B8EA', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {getSql(activeTab).split('\n').map((line, i) => {
              if (line.trim().startsWith('--')) return <span key={i} style={{ color: '#6B7280' }}>{line}{'\n'}</span>;
              if (line.trim().startsWith('CREATE')) return <span key={i} style={{ color: '#A855F7' }}>{line}{'\n'}</span>;
              if (line.trim().startsWith('INSERT')) return <span key={i} style={{ color: '#3B82F6' }}>{line}{'\n'}</span>;
              if (line.trim().startsWith('#')) return <span key={i} style={{ color: '#6B7280' }}>{line}{'\n'}</span>;
              if (line.includes("'K00") || line.includes("'R00") || line.includes("'P00") || line.includes("'C00") || line.includes("'L00"))
                return <span key={i} style={{ color: '#22C55E' }}>{line}{'\n'}</span>;
              if (line.includes("'Normal'") || line.includes("'Tiba'"))
                return <span key={i} style={{ color: '#34D399' }}>{line}{'\n'}</span>;
              if (line.includes("'Peringatan_Keterlambatan'") || line.includes("'Sedang Transit'"))
                return <span key={i} style={{ color: '#F59E0B' }}>{line}{'\n'}</span>;
              return <span key={i}>{line}{'\n'}</span>;
            })}
          </pre>
        </div>
      </div>

      {/* Preview Tabel */}
      <div style={{ background: 'rgba(20, 10, 36, 0.7)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '8px', padding: '20px' }}>
        <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#A855F7', letterSpacing: '1px', marginBottom: '16px' }}>● PRATINJAU DATA TABEL</div>

        {/* Preview Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          {['kapal', 'rute'].map(t => (
            <button key={t} onClick={() => setActivePreview(t)}
              style={{ padding: '6px 14px', borderRadius: '4px', border: '1px solid', cursor: 'pointer', fontSize: '10px', fontFamily: 'monospace', transition: 'all 0.2s',
                borderColor: activePreview === t ? '#A855F7' : 'rgba(168, 85, 247, 0.2)',
                background: activePreview === t ? 'rgba(168, 85, 247, 0.15)' : 'transparent',
                color: activePreview === t ? '#A855F7' : '#8B7BA8'
              }}>
              tb_{t}
            </button>
          ))}
        </div>

        {activePreview === 'kapal' && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(168, 85, 247, 0.3)' }}>
                  {['id_kapal', 'nama_kapal', 'kapasitas_kargo', 'status_sistem'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: '#A855F7', fontWeight: 'bold', fontSize: '10px' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {previewKapal.map(r => (
                  <tr key={r.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '8px 12px', color: '#22C55E' }}>{r.id}</td>
                    <td style={{ padding: '8px 12px', color: 'white', fontWeight: 'bold' }}>{r.nama}</td>
                    <td style={{ padding: '8px 12px', color: '#C7B8EA' }}>{r.kapasitas}</td>
                    <td style={{ padding: '8px 12px' }}>
                      <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold',
                        color: r.status === 'Normal' ? '#22C55E' : '#F59E0B',
                        background: r.status === 'Normal' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                        border: `1px solid ${r.status === 'Normal' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`
                      }}>{r.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activePreview === 'rute' && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(168, 85, 247, 0.3)' }}>
                  {['id_rute', 'asal', 'tujuan', 'estimasi_hari'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: '#A855F7', fontWeight: 'bold', fontSize: '10px' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {previewRute.map(r => (
                  <tr key={r.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '8px 12px', color: '#22C55E' }}>{r.id}</td>
                    <td style={{ padding: '8px 12px', color: '#C7B8EA' }}>{r.asal}</td>
                    <td style={{ padding: '8px 12px', color: '#C7B8EA' }}>{r.tujuan}</td>
                    <td style={{ padding: '8px 12px', color: '#3B82F6', fontWeight: 'bold' }}>{r.hari} hari</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Diagram Relasi */}
      <div style={{ background: 'rgba(20, 10, 36, 0.7)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '8px', padding: '20px' }}>
        <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#A855F7', letterSpacing: '1px', marginBottom: '16px' }}>● DIAGRAM RELASI TABEL (ERD)</div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', flexWrap: 'wrap', fontSize: '11px' }}>
          {[
            { nama: 'tb_pelanggan', warna: '#3B82F6', kunci: 'PK: id_pelanggan' },
            null,
            { nama: 'tb_kargo',     warna: '#A855F7', kunci: 'FK: id_pelanggan\nFK: id_kapal\nFK: id_rute' },
            null,
            { nama: 'tb_kapal',     warna: '#22C55E', kunci: 'PK: id_kapal' },
          ].map((item, i) =>
            item === null ? (
              <div key={i} style={{ color: '#8B7BA8' }}>⟷</div>
            ) : (
              <div key={i} style={{ background: `rgba(${item.warna === '#3B82F6' ? '59,130,246' : item.warna === '#A855F7' ? '168,85,247' : '34,197,94'}, 0.1)`, border: `1px solid ${item.warna}40`, borderRadius: '6px', padding: '10px 16px', textAlign: 'center' }}>
                <div style={{ color: item.warna, fontWeight: 'bold', marginBottom: '4px' }}>{item.nama}</div>
                <div style={{ color: '#8B7BA8', fontSize: '10px', whiteSpace: 'pre' }}>{item.kunci}</div>
              </div>
            )
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '12px', gap: '32px', fontSize: '11px' }}>
          <div style={{ color: '#8B7BA8' }}>↓</div>
          <div style={{ color: '#8B7BA8' }}>↑</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '4px', gap: '16px' }}>
          {[
            { nama: 'tb_rute',   warna: '#F59E0B', kunci: 'PK: id_rute' },
            { nama: 'tb_log_ai', warna: '#EF4444', kunci: 'FK: id_kapal' },
          ].map((item) => (
            <div key={item.nama} style={{ background: `rgba(${item.warna === '#F59E0B' ? '245,158,11' : '239,68,68'}, 0.1)`, border: `1px solid ${item.warna}40`, borderRadius: '6px', padding: '10px 16px', textAlign: 'center', minWidth: '140px' }}>
              <div style={{ color: item.warna, fontWeight: 'bold', marginBottom: '4px' }}>{item.nama}</div>
              <div style={{ color: '#8B7BA8', fontSize: '10px' }}>{item.kunci}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
