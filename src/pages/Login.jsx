import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/* ─── OS-level dark mode detection ─────────────────────────────────────── */
const useSystemDark = () => {
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  const [dark, setDark] = useState(mq.matches);
  useEffect(() => {
    const handler = (e) => setDark(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return dark;
};

/* ─── Icons ─────────────────────────────────────────────────────────────── */
const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const EyeIcon = ({ open }) =>
  open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
      <line x1="2" y1="2" x2="22" y2="22"/>
    </svg>
  );

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
  </svg>
);

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
  </svg>
);

/* ─── Styles ─────────────────────────────────────────────────────────────── */
const getStyles = (dark) => ({
  /* tokens */
  bg:          dark ? '#0f1117' : '#f5f4f0',
  card:        dark ? '#1a1d27' : '#ffffff',
  border:      dark ? '#2a2d3e' : '#e2ddd8',
  inputBg:     dark ? '#12151f' : '#f9f8f6',
  inputBorder: dark ? '#2a2d3e' : '#ddd9d3',
  inputFocus:  dark ? '#4f8ef7' : '#2563eb',
  text:        dark ? '#e8e6f0' : '#1a1816',
  sub:         dark ? '#8b8fa8' : '#6b6662',
  accent:      dark ? '#4f8ef7' : '#2563eb',
  accentHover: dark ? '#3a7de8' : '#1d4ed8',
  danger:      dark ? '#f87171' : '#dc2626',
  success:     dark ? '#4ade80' : '#16a34a',
  toggleBg:    dark ? '#2a2d3e' : '#e8e4df',
  shadow:      dark
    ? '0 24px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)'
    : '0 24px 48px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.04)',
});

/* ─── Component ──────────────────────────────────────────────────────────── */
const Login = () => {
  const systemDark = useSystemDark();
  const navigate = useNavigate();
  const { setUser, user } = useAuth();
  const [manualDark, setManualDark] = useState(null); // null = follow OS
  const dark = manualDark !== null ? manualDark : systemDark;
  const s = getStyles(dark);

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]     = useState(false);
  const [status, setStatus]     = useState(null); // 'loading' | 'success' | 'error'
  const [errMsg, setErrMsg]     = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const [mounted, setMounted]   = useState(false);

  useEffect(() => {
    // staggered mount animation
    setTimeout(() => setMounted(true), 30);
  }, []);

  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true });
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setStatus('error');
      setErrMsg('Please fill in all fields.');
      return;
    }
    setStatus('loading');
    setErrMsg('');
    try {
      const response = await api.post(
        '/auth/login',
        { email, password }
      );
      if (response.data.success) {
        const token = response.data.access_token;
        // persist token and user info
        try { localStorage.setItem('authToken', token); } catch (e) {}
        try { localStorage.setItem('lt_user', JSON.stringify(response.data.user)); } catch (e) {}
        try { setUser(response.data.user || null); } catch (e) {}
        // set default axios header for subsequent requests
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setStatus('success');
        // redirect to dashboard
        navigate('/dashboard', { replace: true });
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error) {
      setStatus('error');
      setErrMsg(error?.response?.data?.message || 'Invalid credentials. Please try again.');
    }
  };

  /* ── Inline styles (no Tailwind dependency) ────────────────────────── */
  const css = {
    root: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: s.bg,
      fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif",
      transition: 'background 0.35s ease',
      padding: '24px',
      boxSizing: 'border-box',
    },
    card: {
      background: s.card,
      border: `1px solid ${s.border}`,
      borderRadius: '20px',
      boxShadow: s.shadow,
      padding: '44px 40px 40px',
      width: '100%',
      maxWidth: '420px',
      transition: 'background 0.35s ease, box-shadow 0.35s ease',
      opacity: mounted ? 1 : 0,
      transform: mounted ? 'translateY(0)' : 'translateY(16px)',
      transitionProperty: 'opacity, transform, background, box-shadow',
      transitionDuration: '0.5s',
      transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
    },
    header: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: '32px',
    },
    logoMark: {
      width: '42px',
      height: '42px',
      borderRadius: '12px',
      background: `linear-gradient(135deg, ${s.accent}, ${dark ? '#8b5cf6' : '#7c3aed'})`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      marginBottom: '20px',
      boxShadow: `0 8px 20px ${s.accent}44`,
    },
    title: {
      fontSize: '26px',
      fontWeight: '700',
      color: s.text,
      letterSpacing: '-0.5px',
      margin: '0 0 6px',
    },
    subtitle: {
      fontSize: '14px',
      color: s.sub,
      margin: 0,
      fontWeight: '400',
    },
    themeToggle: {
      background: s.toggleBg,
      border: 'none',
      borderRadius: '50%',
      width: '36px',
      height: '36px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: s.sub,
      transition: 'background 0.2s, color 0.2s, transform 0.2s',
      flexShrink: 0,
    },
    fieldGroup: {
      marginBottom: '16px',
    },
    label: {
      display: 'block',
      fontSize: '13px',
      fontWeight: '600',
      color: s.sub,
      marginBottom: '8px',
      letterSpacing: '0.02em',
      textTransform: 'uppercase',
    },
    inputWrap: (field) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      background: s.inputBg,
      border: `1.5px solid ${focusedField === field ? s.inputFocus : s.inputBorder}`,
      borderRadius: '12px',
      padding: '0 14px',
      transition: 'border-color 0.2s, box-shadow 0.2s',
      boxShadow: focusedField === field
        ? `0 0 0 3px ${s.accent}22`
        : 'none',
    }),
    iconWrap: {
      color: s.sub,
      display: 'flex',
      flexShrink: 0,
    },
    input: {
      flex: 1,
      background: 'transparent',
      border: 'none',
      outline: 'none',
      padding: '14px 0',
      fontSize: '15px',
      color: s.text,
      fontFamily: 'inherit',
    },
    eyeBtn: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: s.sub,
      display: 'flex',
      padding: '2px',
      borderRadius: '4px',
      transition: 'color 0.2s',
    },
    forgotRow: {
      textAlign: 'right',
      marginTop: '8px',
      marginBottom: '24px',
    },
    forgotLink: {
      fontSize: '13px',
      color: s.accent,
      textDecoration: 'none',
      fontWeight: '500',
    },
    submitBtn: {
      width: '100%',
      padding: '15px',
      background: status === 'loading'
        ? s.toggleBg
        : `linear-gradient(135deg, ${s.accent} 0%, ${dark ? '#8b5cf6' : '#7c3aed'} 100%)`,
      border: 'none',
      borderRadius: '12px',
      color: status === 'loading' ? s.sub : '#fff',
      fontSize: '15px',
      fontWeight: '600',
      cursor: status === 'loading' ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease',
      letterSpacing: '0.01em',
      boxShadow: status === 'loading'
        ? 'none'
        : `0 4px 16px ${s.accent}55`,
      fontFamily: 'inherit',
    },
    feedback: {
      marginTop: '14px',
      padding: '12px 14px',
      borderRadius: '10px',
      fontSize: '13.5px',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    errorBox: {
      background: dark ? '#2d1515' : '#fef2f2',
      color: s.danger,
      border: `1px solid ${dark ? '#4d2020' : '#fecaca'}`,
    },
    successBox: {
      background: dark ? '#102210' : '#f0fdf4',
      color: s.success,
      border: `1px solid ${dark ? '#1a4020' : '#bbf7d0'}`,
    },
    divider: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      margin: '24px 0',
      color: s.sub,
      fontSize: '12px',
      fontWeight: '500',
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    },
    dividerLine: {
      flex: 1,
      height: '1px',
      background: s.border,
    },
    osModeNote: {
      textAlign: 'center',
      fontSize: '12px',
      color: s.sub,
      marginTop: '20px',
    },
  };

  return (
    <>
      {/* Google Font */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <div style={css.root}>
        <div style={css.card}>
          {/* Header */}
          <div style={css.header}>
            <div>
              <div style={css.logoMark}>🏆</div>
              <h1 style={css.title}>Welcome back</h1>
              <p style={css.subtitle}>Sign in to LoyaltyTown</p>
            </div>
            <button
              style={css.themeToggle}
              onClick={() => setManualDark(d => d === null ? !systemDark : !d)}
              title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label="Toggle theme"
            >
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} noValidate>
            {/* Email */}
            <div style={css.fieldGroup}>
              <label style={css.label} htmlFor="lt-email">Email</label>
              <div style={css.inputWrap('email')}>
                <span style={css.iconWrap}><MailIcon /></span>
                <input
                  id="lt-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="you@example.com"
                  style={css.input}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div style={css.fieldGroup}>
              <label style={css.label} htmlFor="lt-password">Password</label>
              <div style={css.inputWrap('password')}>
                <span style={css.iconWrap}><LockIcon /></span>
                <input
                  id="lt-password"
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="••••••••"
                  style={css.input}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  style={css.eyeBtn}
                  onClick={() => setShowPw(p => !p)}
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                >
                  <EyeIcon open={showPw} />
                </button>
              </div>
            </div>

            {/* Forgot */}
            <div style={css.forgotRow}>
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                style={{ ...css.forgotLink, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              style={css.submitBtn}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Signing in…' : 'Sign in'}
            </button>

            <div style={{ marginTop: 12, textAlign: 'center' }}>
              <button
                type="button"
                onClick={() => navigate('/register-company')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: s.accent,
                  fontWeight: 600,
                  cursor: 'pointer',
                  marginTop: 6,
                }}
              >
                Create account
              </button>
            </div>

            {/* Feedback */}
            {status === 'error' && (
              <div style={{ ...css.feedback, ...css.errorBox }}>
                <span>⚠</span> {errMsg}
              </div>
            )}
            {status === 'success' && (
              <div style={{ ...css.feedback, ...css.successBox }}>
                <span>✓</span> Login successful! Redirecting…
              </div>
            )}
          </form>

          {/* OS note */}
          <p style={css.osModeNote}>
            © 2026 ADIION DIGITAL LABS PRIVATE LIMITED All rights reserved
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;