"use client";
import React, { useState } from 'react';

// Halaman Test Koneksi Database Neon
export default function TestDbPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeEndpoint, setActiveEndpoint] = useState('');
  const [error, setError] = useState('');

  const endpoints = [
    { id: 'kapal',  label: 'GET /api/kapal',   desc: 'Daftar 8 kapal dari Neon DB',  color: '#22C55E' },
    { id: 'kargo',  label: 'GET /api/kargo',   desc: 'Kargo + JOIN 4 tabel',          color: '#3B82F6' },
    { id: 'log-ai', label: 'GET /api/log-ai',  desc: 'Log diagnostik AI',             color: '#A855F7' },
  ];

  async function fetchApi(endpoint) {
    setLoading(true);
    setError('');
    setResult(null);
    setActiveEndpoint(endpoint);
    try {
      const res = await fetch(`/api/${endpoint}`);
      const json = await res.json();
      setResult(json);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', color: 'white', fontFamily: 'monospace' }}>

      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(168, 85, 247, 0.2)', paddingBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <div style={{ width: '36px', height: '36px', background: 'rgba(59, 130, 246, 0.15)', border: '1px solid rgba(59, 130, 246, 0.4)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
            </svg>
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', letterSpacing: '2px' }}>TEST KONEKSI DATABASE NEON</h1>
            <p style={{ margin: 0, fontSize: '11px', color: '#8B7BA8' }}>Klik tombol di bawah untuk test API route ke Neon PostgreSQL</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span style={{ fontSize: '10px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '4px', padding: '2px 8px', color: '#3B82F6' }}>Neon PostgreSQL</span>
          <span style={{ fontSize: '10px', background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '4px', padding: '2px 8px', color: '#A855F7' }}>@neondatabase/serverless</span>
        </div>
      </div>

      {/* Endpoint Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
        {endpoints.map(ep => (
          <button
            key={ep.id}
            onClick={() => fetchApi(ep.id)}
            disabled={loading}
            style={{
              background: activeEndpoint === ep.id ? `rgba(${ep.color === '#22C55E' ? '34,197,94' : ep.color === '#3B82F6' ? '59,130,246' : '168,85,247'}, 0.15)` : 'rgba(20, 10, 36, 0.7)',
              border: `1px solid ${activeEndpoint === ep.id ? ep.color : 'rgba(168, 85, 247, 0.2)'}`,
              borderRadius: '6px', padding: '16px', textAlign: 'left', cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s', opacity: loading ? 0.6 : 1
            }}
          >
            <div style={{ fontSize: '10px', color: ep.color, fontWeight: 'bold', marginBottom: '4px', letterSpacing: '1px' }}>{ep.label}</div>
            <div style={{ fontSize: '10px', color: '#8B7BA8' }}>{ep.desc}</div>
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div style={{ background: 'rgba(20,10,36,0.7)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '8px', padding: '24px', textAlign: 'center', color: '#A855F7', fontSize: '12px' }}>
          ⟳ Menghubungi Neon DB...
        </div>
      )}

      {/* Error State */}
      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', padding: '20px' }}>
          <div style={{ color: '#EF4444', fontWeight: 'bold', fontSize: '12px', marginBottom: '8px' }}>❌ ERROR — Koneksi Gagal</div>
          <div style={{ color: '#FCA5A5', fontSize: '11px', fontFamily: 'monospace' }}>{error}</div>
          <div style={{ color: '#8B7BA8', fontSize: '10px', marginTop: '12px' }}>
            Cek: ① File .env.local sudah ada di root UTS? ② npm install @neondatabase/serverless? ③ Restart npm run dev?
          </div>
        </div>
      )}

      {/* Result */}
      {result && !loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Status Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: result.success ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${result.success ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: '6px', padding: '10px 16px' }}>
            <span style={{ color: result.success ? '#22C55E' : '#EF4444', fontWeight: 'bold', fontSize: '12px' }}>
              {result.success ? '✓ KONEKSI BERHASIL' : '✗ KONEKSI GAGAL'}
            </span>
            <span style={{ color: '#8B7BA8', fontSize: '10px' }}>
              {result.total !== undefined && `${result.total} baris data`}
            </span>
          </div>

          {/* Data Table */}
          {result.success && result.data && result.data.length > 0 && (
            <div style={{ background: 'rgba(20,10,36,0.7)', border: '1px solid rgba(168,85,247,0.2)', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ fontSize: '10px', color: '#A855F7', fontWeight: 'bold', letterSpacing: '1px', padding: '12px 16px', borderBottom: '1px solid rgba(168,85,247,0.1)' }}>
                ● HASIL DATA — /api/{activeEndpoint}
              </div>
              <div style={{ overflowX: 'auto', maxHeight: '350px', overflowY: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(168,85,247,0.2)' }}>
                      {Object.keys(result.data[0]).map(col => (
                        <th key={col} style={{ textAlign: 'left', padding: '8px 12px', color: '#A855F7', fontWeight: 'bold', whiteSpace: 'nowrap' }}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.data.map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        {Object.values(row).map((val, j) => (
                          <td key={j} style={{ padding: '8px 12px', color: j === 0 ? '#22C55E' : '#C7B8EA', whiteSpace: 'nowrap', maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {String(val ?? '-')}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Raw JSON */}
          <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(168,85,247,0.15)', borderRadius: '8px', padding: '16px' }}>
            <div style={{ fontSize: '10px', color: '#8B7BA8', marginBottom: '8px' }}>RAW JSON RESPONSE:</div>
            <pre style={{ margin: 0, fontSize: '10px', color: '#C7B8EA', maxHeight: '200px', overflow: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* Tutorial Singkat */}
      {!result && !loading && (
        <div style={{ background: 'rgba(20,10,36,0.7)', border: '1px solid rgba(168,85,247,0.2)', borderRadius: '8px', padding: '20px' }}>
          <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#A855F7', marginBottom: '12px', letterSpacing: '1px' }}>● PRASYARAT SEBELUM TEST</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px' }}>
            {[
              { no: '1', text: 'Buka Vercel → Storage → Buat Neon Database', done: false },
              { no: '2', text: 'Copy .env.local dari Vercel → paste ke file .env.local di root UTS', done: false },
              { no: '3', text: 'Buka Neon SQL Editor → Jalankan CREATE TABLE', done: false },
              { no: '4', text: 'Jalankan INSERT INTO (urutan: kapal → rute → pelanggan → kargo → log_ai)', done: false },
              { no: '5', text: 'npm install @neondatabase/serverless', done: false },
              { no: '6', text: 'npm run dev → klik tombol test di atas', done: false },
            ].map(step => (
              <div key={step.no} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', color: '#C7B8EA' }}>
                <span style={{ minWidth: '20px', height: '20px', background: 'rgba(168,85,247,0.2)', border: '1px solid rgba(168,85,247,0.4)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', color: '#A855F7', flexShrink: 0 }}>{step.no}</span>
                <span style={{ fontSize: '10px', lineHeight: '1.5' }}>{step.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
