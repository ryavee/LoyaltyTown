import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const check = async () => {
      try {
        const res = await api.get('/auth/check');
        if (!mounted) return;
        if (res?.data?.success) {
          setUser(res.data.user || null);
          // if backend returns a token (non-httpOnly fallback), persist it
          if (res?.data?.access_token) {
            const t = res.data.access_token;
            try { localStorage.setItem('authToken', t); } catch (e) {}
            api.defaults.headers.common['Authorization'] = `Bearer ${t}`;
          }
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    check();
    return () => { mounted = false; };
  }, []);

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (e) {}
    try {
      localStorage.removeItem('authToken');
      localStorage.removeItem('lt_user');
    } catch (e) {}
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
  };

  const value = { user, setUser, loading, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
