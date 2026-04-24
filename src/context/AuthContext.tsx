import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  user: any | null;
  isAdmin: boolean;
  loading: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for token
    const token = localStorage.getItem('admin_token');
    if (token === 'admin-token-xyz') {
      setIsAdmin(true);
    }
    setLoading(false);
  }, []);

  const login = async (password: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          localStorage.setItem('admin_token', data.token);
          setIsAdmin(true);
          return true;
        }
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const logout = async () => {
    localStorage.removeItem('admin_token');
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user: isAdmin ? { email: 'admin' } : null, isAdmin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
