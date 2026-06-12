import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('lt_user');
      if (savedUser && savedUser !== "undefined" && savedUser !== "null") {
        return JSON.parse(savedUser);
      }
    } catch (e) {
      console.error("Error parsing user from localStorage", e);
    }
    return null;
  });

  // We start loading as true to prevent RequireAuth from redirecting to login
  // before we've had a chance to verify the existing token.
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');

      // If no token exists at all, we're definitely not logged in
      if (!token) {
        if (mounted) {
          setUser(null);
          setLoading(false);
        }
        return;
      }

      try {
        // The api instance has an interceptor that adds the Authorization header automatically
        const res = await api.get('/auth/check');

        if (!mounted) return;

        if (res.data && res.data.success) {
          const userData = res.data.user || null;
          setUser(userData);
          if (userData) {
            localStorage.setItem('lt_user', JSON.stringify(userData));
          }
        } else {
          // If the backend returns success: false, clear local state
          handleClearAuth();
        }
      } catch (err) {
        if (!mounted) return;
        // 401 errors are handled by the api.js interceptor (hard redirect)
        // We handle other failure cases here
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          handleClearAuth();
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    checkAuth();
    return () => { mounted = false; };
  }, []);

  const handleClearAuth = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('lt_user');
    setUser(null);
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (e) {}
    handleClearAuth();
  };

  const value = { user, setUser, loading, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined || context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
