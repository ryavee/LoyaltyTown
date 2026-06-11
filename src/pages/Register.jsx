import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

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

const getStyles = (dark) => ({
  bg: dark ? '#0f1117' : '#f5f4f0',
  card: dark ? '#1a1d27' : '#ffffff',
  border: dark ? '#2a2d3e' : '#e2ddd8',
  inputBg: dark ? '#12151f' : '#f9f8f6',
  inputBorder: dark ? '#2a2d3e' : '#ddd9d3',
  inputFocus: dark ? '#4f8ef7' : '#2563eb',
  text: dark ? '#e8e6f0' : '#1a1816',
  sub: dark ? '#8b8fa8' : '#6b6662',
  accent: dark ? '#4f8ef7' : '#2563eb',
  shadow: dark
    ? '0 24px 48px rgba(0,0,0,0.6)'
    : '0 24px 48px rgba(0,0,0,0.10)',
});

const Register = () => {
  const systemDark = useSystemDark();
  const dark = systemDark;
  const s = getStyles(dark);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [status, setStatus] = useState(null);
  const [errMsg, setErrMsg] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPw) {
      setErrMsg('Please fill all fields');
      setStatus('error');
      return;
    }
    if (password !== confirmPw) {
      setErrMsg('Passwords do not match');
      setStatus('error');
      return;
    }
    setStatus('loading');
    setErrMsg('');
    try {
      const res = await api.post('/auth/register', { name, email, password });
      if (res?.data?.success) {
        setStatus('success');
        setTimeout(() => navigate('/login', { replace: true }), 800);
      } else {
        setStatus('error');
        setErrMsg(res?.data?.message || 'Registration failed');
      }
    } catch (err) {
      setStatus('error');
      setErrMsg(err?.response?.data?.message || 'Registration failed');
    }
  };

  const css = {
    root: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: s.bg, padding: 24 },
    card: { background: s.card, border: `1px solid ${s.border}`, borderRadius: 20, padding: 36, width: '100%', maxWidth: 480, boxShadow: s.shadow },
    title: { fontSize: 22, fontWeight: 700, color: s.text, marginBottom: 6 },
    subtitle: { color: s.sub, marginBottom: 18 },
    field: { marginBottom: 12 },
    input: { width: '100%', padding: '12px 14px', borderRadius: 10, border: `1px solid ${s.inputBorder}`, background: s.inputBg, color: s.text, outline: 'none' },
    submit: { marginTop: 8, width: '100%', padding: '12px', borderRadius: 10, border: 'none', background: s.accent, color: '#fff', fontWeight: 600, cursor: 'pointer' },
    linkBtn: { marginTop: 8, background: 'transparent', border: 'none', color: s.accent, cursor: 'pointer' },
    feedback: { marginTop: 10, color: status === 'error' ? '#dc2626' : '#16a34a' },
  };

  return (
    <div style={css.root}>
      <div style={css.card}>
        <h2 style={css.title}>Create account</h2>
        <p style={css.subtitle}>Create an admin account for LoyaltyTown</p>

        <form onSubmit={handleRegister}>
          <div style={css.field}>
            <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} style={css.input} />
          </div>
          <div style={css.field}>
            <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={css.input} />
          </div>
          <div style={css.field}>
            <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={css.input} />
          </div>
          <div style={css.field}>
            <input placeholder="Confirm password" type="password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} style={css.input} />
          </div>

          <button type="submit" style={css.submit}>{status === 'loading' ? 'Creating…' : 'Create account'}</button>
        </form>

        {status === 'error' && <div style={css.feedback}>{errMsg}</div>}
        {status === 'success' && <div style={css.feedback}>Account created — redirecting to login…</div>}

        <div style={{ marginTop: 12, textAlign: 'center' }}>
          <button type="button" onClick={() => navigate('/login')} style={css.linkBtn}>Back to sign in</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
