import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

const KeyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3L15.5 7.5z"/>
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12 19 5 12 12 5"/>
  </svg>
);

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
  </svg>
);

/* ─── Styles ─────────────────────────────────────────────────────────────── */
const getStyles = (dark) => ({
  bg:          dark ? '#0f1117' : '#f5f4f0',
  card:        dark ? '#1a1d27' : '#ffffff',
  border:      dark ? '#2a2d3e' : '#e2ddd8',
  inputBg:     dark ? '#12151f' : '#f9f8f6',
  inputBorder: dark ? '#2a2d3e' : '#ddd9d3',
  inputFocus:  dark ? '#4f8ef7' : '#2563eb',
  text:        dark ? '#e8e6f0' : '#1a1816',
  sub:         dark ? '#8b8fa8' : '#6b6662',
  accent:      dark ? '#4f8ef7' : '#2563eb',
  toggleBg:    dark ? '#2a2d3e' : '#e8e4df',
  shadow:      dark
    ? '0 24px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)'
    : '0 24px 48px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.04)',
});

const ForgotPassword = () => {
  const systemDark = useSystemDark();
  const navigate = useNavigate();
  const [manualDark, setManualDark] = useState(null);
  const dark = manualDark !== null ? manualDark : systemDark;
  const s = getStyles(dark);

  const [step, setStep] = useState(1); // 1: Email, 2: OTP
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 30);
  }, []);

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1500);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (otp.join('').length < 6) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate('/login');
    }, 1500);
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

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
      opacity: mounted ? 1 : 0,
      transform: mounted ? 'translateY(0)' : 'translateY(16px)',
      transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
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
      lineHeight: '1.5',
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
      flexShrink: 0,
    },
    inputWrap: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      background: s.inputBg,
      border: `1.5px solid ${s.inputBorder}`,
      borderRadius: '12px',
      padding: '0 14px',
      marginTop: '24px',
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
    otpContainer: {
      display: 'flex',
      gap: '10px',
      justifyContent: 'center',
      marginTop: '24px',
    },
    otpInput: {
      width: '45px',
      height: '52px',
      textAlign: 'center',
      fontSize: '20px',
      fontWeight: '600',
      background: s.inputBg,
      border: `1.5px solid ${s.inputBorder}`,
      borderRadius: '10px',
      color: s.text,
      outline: 'none',
    },
    submitBtn: {
      width: '100%',
      padding: '15px',
      background: loading ? s.toggleBg : `linear-gradient(135deg, ${s.accent} 0%, ${dark ? '#8b5cf6' : '#7c3aed'} 100%)`,
      border: 'none',
      borderRadius: '12px',
      color: loading ? s.sub : '#fff',
      fontSize: '15px',
      fontWeight: '600',
      cursor: loading ? 'not-allowed' : 'pointer',
      marginTop: '32px',
      boxShadow: loading ? 'none' : `0 4px 16px ${s.accent}55`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
    },
    backBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      background: 'none',
      border: 'none',
      color: s.sub,
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      marginTop: '24px',
      marginWidth: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto',
    }
  };

  return (
    <div style={css.root}>
      <div style={css.card}>
        <div style={css.header}>
          <div>
            <div style={css.logoMark}>🔒</div>
            <h1 style={css.title}>{step === 1 ? 'Forgot Password' : 'Verify OTP'}</h1>
            <p style={css.subtitle}>
              {step === 1
                ? "Enter your email address and we'll send you a 6-digit code to reset your password."
                : `We've sent a code to ${email}. Enter it below to continue.`}
            </p>
          </div>
          <button
            style={css.themeToggle}
            onClick={() => setManualDark(d => d === null ? !systemDark : !d)}
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        {step === 1 ? (
          <form onSubmit={handleSendOTP}>
            <div style={css.inputWrap}>
              <span style={{ color: s.sub, display: 'flex' }}><MailIcon /></span>
              <input
                type="email"
                required
                placeholder="Enter your email"
                style={css.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button style={css.submitBtn} disabled={loading}>
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP}>
            <div style={css.otpContainer}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  style={css.otpInput}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  autoFocus={index === 0}
                />
              ))}
            </div>
            <button style={css.submitBtn} disabled={loading}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>
        )}

        <button style={css.backBtn} onClick={() => step === 2 ? setStep(1) : navigate('/login')}>
          <ArrowLeftIcon /> Back to Login
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;