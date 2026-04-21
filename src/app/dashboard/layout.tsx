"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [timeStr, setTimeStr] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    function updateTime() {
      const now = new Date();
      setTimeStr(now.toLocaleString('id-ID', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      }));
    }
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const navLinkStyle = (paths: string[]) => {
    const active = paths.some(p => pathname === p || pathname.startsWith(p + '/'));
    return {
      background: active ? 'linear-gradient(90deg, #A855F7 0%, #9249F2 50%, #7C3AED 100%)' : 'transparent',
      padding: '8px 12px',
      borderRadius: '4px',
      color: active ? 'white' : 'var(--text-muted, #8B7BA8)',
      textDecoration: 'none',
      fontSize: '11px',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      fontWeight: 'bold',
      letterSpacing: '1px',
      boxShadow: active ? '0 0 15px rgba(168, 85, 247, 0.4)' : 'none',
      whiteSpace: 'nowrap' as const,
    };
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: 'var(--bg-page, #0A0414)',
      color: 'white',
      fontFamily: 'var(--font-body, monospace)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Top Navigation Bar */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 20px',
        borderBottom: '1px solid var(--border-purple, rgba(168, 85, 247, 0.3))',
        background: 'rgba(10, 4, 20, 0.97)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        gap: '16px',
        flexWrap: 'wrap'
      }}>
        {/* Left: Logo & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          <div style={{ width: '36px', height: '36px', background: 'white', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image src="/logo.png" alt="Logo" width={28} height={28} style={{ objectFit: 'contain' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '14px', fontWeight: 'bold', letterSpacing: '1px', color: '#C084FC' }}>KOMANDO SIWeb</span>
            <span style={{ fontSize: '9px', color: 'var(--text-muted, #8B7BA8)' }}>Sistem Logistik Maritim v2.0</span>
          </div>
        </div>

        {/* Center: Main Menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>

          {/* DASHBOARD with Dropdown */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <div style={{
              ...navLinkStyle(['/dashboard']),
              cursor: 'pointer',
              fontSize: '11px',
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              DASHBOARD ▾
            </div>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div style={{
                position: 'absolute', top: '100%', left: 0, width: '200px',
                background: 'rgba(20, 10, 36, 0.97)', backdropFilter: 'blur(10px)',
                border: '1px solid var(--border-purple, rgba(168, 85, 247, 0.3))',
                borderRadius: '4px', padding: '8px 0', display: 'flex',
                flexDirection: 'column', marginTop: '4px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.5)', zIndex: 100
              }}>
                {[
                  { href: '/dashboard',             label: 'Ringkasan' },
                  { href: '/dashboard/pemeliharaan', label: 'Pemeliharaan' },
                  { href: '/dashboard/peringatan',   label: 'Peringatan' },
                ].map(item => (
                  <Link key={item.href} href={item.href} style={{
                    padding: '10px 16px', color: pathname === item.href ? 'white' : 'var(--text-light, #C7B8EA)',
                    textDecoration: 'none', fontSize: '12px',
                    background: pathname === item.href ? 'rgba(168, 85, 247, 0.1)' : 'transparent',
                    borderLeft: pathname === item.href ? '2px solid #A855F7' : '2px solid transparent',
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                  }}>{item.label}</Link>
                ))}
              </div>
            )}
          </div>

          {/* ARMADA */}
          <Link href="/dashboard/fleet" style={navLinkStyle(['/dashboard/fleet'])}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
              <line x1="4" y1="22" x2="4" y2="15"></line>
            </svg>
            ARMADA
          </Link>

          {/* PETA */}
          <Link href="/dashboard/map" style={navLinkStyle(['/dashboard/map'])}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon>
              <line x1="9" y1="3" x2="9" y2="18"></line>
              <line x1="15" y1="6" x2="15" y2="21"></line>
            </svg>
            PETA
          </Link>

          {/* ANALITIK */}
          <Link href="/dashboard/analytics" style={navLinkStyle(['/dashboard/analytics'])}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
            ANALITIK
          </Link>

          {/* DIAGNOSTIK AI — Modul 1 */}
          <Link href="/dashboard/diagnostik" style={{
            ...navLinkStyle(['/dashboard/diagnostik']),
            border: pathname.startsWith('/dashboard/diagnostik') ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid rgba(245, 158, 11, 0.2)',
            color: pathname.startsWith('/dashboard/diagnostik') ? 'white' : '#F59E0B',
            background: pathname.startsWith('/dashboard/diagnostik') ? 'linear-gradient(90deg, #D97706, #B45309)' : 'rgba(245, 158, 11, 0.05)',
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
            DIAGNOSTIK AI
          </Link>

          {/* DATABASE — Modul 2 */}
          <Link href="/dashboard/generator" style={{
            ...navLinkStyle(['/dashboard/generator']),
            border: pathname.startsWith('/dashboard/generator') ? '1px solid rgba(59, 130, 246, 0.4)' : '1px solid rgba(59, 130, 246, 0.2)',
            color: pathname.startsWith('/dashboard/generator') ? 'white' : '#3B82F6',
            background: pathname.startsWith('/dashboard/generator') ? 'linear-gradient(90deg, #2563EB, #1D4ED8)' : 'rgba(59, 130, 246, 0.05)',
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
            </svg>
            DATABASE
          </Link>

          {/* TEST DB — Koneksi Neon */}
          <Link href="/dashboard/test-db" style={{
            ...navLinkStyle(['/dashboard/test-db']),
            border: pathname.startsWith('/dashboard/test-db') ? '1px solid rgba(34, 197, 94, 0.4)' : '1px solid rgba(34, 197, 94, 0.2)',
            color: pathname.startsWith('/dashboard/test-db') ? 'white' : '#22C55E',
            background: pathname.startsWith('/dashboard/test-db') ? 'linear-gradient(90deg, #16A34A, #15803D)' : 'rgba(34, 197, 94, 0.05)',
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            TEST DB
          </Link>
        </div>

        {/* Right: Status, Date, Exit */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(20, 10, 36, 0.8)', border: '1px solid rgba(168, 85, 247, 0.2)', padding: '6px 10px', borderRadius: '4px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 8px #22C55E' }}></div>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2' }}>
              <span style={{ fontSize: '9px', color: 'var(--text-muted, #8B7BA8)' }}>SISTEM</span>
              <span style={{ fontSize: '9px', color: 'white', fontWeight: 'bold' }}>ONLINE</span>
            </div>
          </div>

          <div style={{ fontSize: '10px', color: 'var(--text-muted, #8B7BA8)', lineHeight: '1.4', textAlign: 'right' }}>
            {timeStr || '21 Apr 2026, 22:04'}
          </div>

          <Link href="/login" style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            border: '1px solid rgba(255, 255, 255, 0.1)', padding: '6px 10px',
            borderRadius: '4px', color: 'var(--text-muted, #8B7BA8)',
            textDecoration: 'none', fontSize: '10px', cursor: 'pointer'
          }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            KELUAR
          </Link>
        </div>
      </nav>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '24px' }}>
        {children}
      </main>
    </div>
  );
}
