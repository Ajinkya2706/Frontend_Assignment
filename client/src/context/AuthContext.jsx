import { createContext, useContext, useEffect, useState } from 'react';
import { loginRequest, registerRequest, fetchProfile } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token && !user) {
      fetchProfile()
        .then(setUser)
        .catch(() => logout());
    }
  }, [token, user]);

  const persist = (nextToken, profile) => {
    setToken(nextToken);
    setUser(profile);
    localStorage.setItem('token', nextToken);
    localStorage.setItem('user', JSON.stringify(profile));
  };

  const handleAuth = async (fn, payload) => {
    setLoading(true);
    try {
      const { token: t, user: u } = await fn(payload);
      persist(t, u);
      return { token: t, user: u };
    } finally {
      setLoading(false);
    }
  };

  const login = (payload) => handleAuth(loginRequest, payload);
  const register = (payload) => handleAuth(registerRequest, payload);

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value = { token, user, loading, login, register, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

