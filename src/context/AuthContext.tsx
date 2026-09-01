import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { verifyShikharSession, logoutShikhar } from '../lib/api';

interface AuthContextType {
  isAuthenticated: boolean;
  isShikharUnlocked: boolean;
  userEmail: string | null;
  userName: string | null;
  serverShikharState: any | null;
  serverUnlockedSessions: number[] | null;
  login: (code: string) => boolean;
  loginWithEmail: (email: string, token: string, name: string, state?: any, unlockedSessions?: number[]) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => localStorage.getItem('tgp_auth') === 'true');
  const [isShikharUnlocked, setIsShikharUnlocked] = useState<boolean>(() => localStorage.getItem('tgp_auth') === 'true');
  const [userEmail, setUserEmail] = useState<string | null>(() => localStorage.getItem('tgp_user_email'));
  const [userName, setUserName] = useState<string | null>(() => localStorage.getItem('tgp_user_name'));
  const [serverShikharState, setServerShikharState] = useState<any | null>(null);
  const [serverUnlockedSessions, setServerUnlockedSessions] = useState<number[] | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const email = localStorage.getItem('tgp_user_email');
      const token = localStorage.getItem('tgp_session_token');
      if (email && token) {
        try {
          const res = await verifyShikharSession(email, token);
          if (!res.valid) {
            logout();
          } else {
            if (res.user && res.user.name) {
              setUserName(res.user.name);
              localStorage.setItem('tgp_user_name', res.user.name);
            }
            if (res.shikharState) {
              setServerShikharState(res.shikharState);
            }
            if (res.unlockedSessions) {
              setServerUnlockedSessions(res.unlockedSessions);
            }
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

  const loginWithEmail = (email: string, token: string, name: string, state?: any, unlockedSessions?: number[]) => {
    // We NO LONGER clear shikhar-program-data here.
    // useShikharStore automatically clears stale data if a DIFFERENT user logs in.
    
    setIsAuthenticated(true);
    setIsShikharUnlocked(true);
    setUserEmail(email);
    setUserName(name);
    if (state) setServerShikharState(state);
    if (unlockedSessions) setServerUnlockedSessions(unlockedSessions);
    localStorage.setItem('tgp_auth', 'true');
    localStorage.setItem('tgp_user_email', email);
    localStorage.setItem('tgp_user_name', name);
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
    setUserName(null);
    setServerShikharState(null);
    setServerUnlockedSessions(null);
    localStorage.removeItem('tgp_auth');
    localStorage.removeItem('tgp_user_email');
    localStorage.removeItem('tgp_user_name');
    localStorage.removeItem('tgp_session_token');
    // We NO LONGER clear shikhar-program-data here, so a user logging back in doesn't lose their un-synced progress.
    // useShikharStore automatically clears it if a DIFFERENT user logs in.
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isShikharUnlocked, userEmail, userName, serverShikharState, serverUnlockedSessions, login, loginWithEmail, logout }}>
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
