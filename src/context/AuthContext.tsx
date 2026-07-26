import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { verifyShikharSession, logoutShikhar } from '../lib/api';

interface AuthContextType {
  isAuthenticated: boolean;
  isShikharUnlocked: boolean;
  userEmail: string | null;
  login: (code: string) => boolean;
  loginWithEmail: (email: string, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => localStorage.getItem('tgp_auth') === 'true');
  const [isShikharUnlocked, setIsShikharUnlocked] = useState<boolean>(() => localStorage.getItem('tgp_auth') === 'true');
  const [userEmail, setUserEmail] = useState<string | null>(() => localStorage.getItem('tgp_user_email'));

  useEffect(() => {
    const checkSession = async () => {
      const email = localStorage.getItem('tgp_user_email');
      const token = localStorage.getItem('tgp_session_token');
      if (email && token) {
        try {
          const res = await verifyShikharSession(email, token);
          if (!res.valid) {
            logout();
          }
        } catch (e) {
          logout();
        }
      }
    };
    checkSession();
  }, [userEmail]);

  const login = (code: string) => {
    // Legacy passcode login (kept as fallback)
    if (code.toUpperCase() === 'SHIKHAR2026') {
      setIsAuthenticated(true);
      setIsShikharUnlocked(true);
      localStorage.setItem('tgp_auth', 'true');
      return true;
    }
    return false;
  };

  const loginWithEmail = (email: string, token: string) => {
    setIsAuthenticated(true);
    setIsShikharUnlocked(true);
    setUserEmail(email);
    localStorage.setItem('tgp_auth', 'true');
    localStorage.setItem('tgp_user_email', email);
    localStorage.setItem('tgp_session_token', token);
  };

  const logout = () => {
    const email = localStorage.getItem('tgp_user_email');
    const token = localStorage.getItem('tgp_session_token');
    if (email && token) {
      logoutShikhar(email, token).catch(() => {});
    }
    
    setIsAuthenticated(false);
    setIsShikharUnlocked(false);
    setUserEmail(null);
    localStorage.removeItem('tgp_auth');
    localStorage.removeItem('tgp_user_email');
    localStorage.removeItem('tgp_session_token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isShikharUnlocked, userEmail, login, loginWithEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
