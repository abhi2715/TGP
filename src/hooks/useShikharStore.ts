import { useState, useCallback, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { syncShikharState } from '../lib/api';

export interface SessionData {
  completed: boolean;
  exerciseData: Record<string, unknown>;
  completedAt?: string;
}

export interface ShikharState {
  sessions: Record<number, SessionData>;
  currentSession: number;
  programStarted: boolean;
  userName: string;
}

const DEFAULT_STATE: ShikharState = {
  sessions: {
    1: { completed: false, exerciseData: {} },
    2: { completed: false, exerciseData: {} },
    3: { completed: false, exerciseData: {} },
    4: { completed: false, exerciseData: {} },
    5: { completed: false, exerciseData: {} },
    6: { completed: false, exerciseData: {} },
  },
  currentSession: 1,
  programStarted: false,
  userName: '',
};

const STORAGE_KEY = 'shikhar-program-data';

function loadState(): ShikharState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_STATE, ...parsed };
    }
  } catch {
    // ignore
  }
  return { ...DEFAULT_STATE };
}

export function useShikharStore() {
  const { serverShikharState, userEmail } = useAuth();

  const [state, setState] = useState<ShikharState>(() => {
    let baseState = loadState();
    if (serverShikharState && Object.keys(serverShikharState).length > 0) {
      baseState = { ...DEFAULT_STATE, ...serverShikharState };
    }
    return baseState;
  });

  useEffect(() => {
    if (serverShikharState && Object.keys(serverShikharState).length > 0) {
      setState(prev => ({ ...prev, ...serverShikharState }));
    }
  }, [serverShikharState]);

  const saveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const token = localStorage.getItem('tgp_session_token');

  useEffect(() => {
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      if (userEmail && token) {
        syncShikharState(userEmail, token, state).catch(() => {});
      }
    }, 500);
    return () => clearTimeout(saveTimer.current);
  }, [state, userEmail, token]);

  const updateSession = useCallback((sessionId: number, data: Partial<SessionData>) => {
    setState(prev => ({
      ...prev,
      sessions: {
        ...prev.sessions,
        [sessionId]: { ...prev.sessions[sessionId], ...data },
      },
    }));
  }, []);

  const updateExerciseData = useCallback((sessionId: number, key: string, value: unknown) => {
    setState(prev => ({
      ...prev,
      sessions: {
        ...prev.sessions,
        [sessionId]: {
          ...prev.sessions[sessionId],
          exerciseData: {
            ...prev.sessions[sessionId].exerciseData,
            [key]: value,
          },
        },
      },
    }));
  }, []);

  const completeSession = useCallback((sessionId: number) => {
    setState(prev => ({
      ...prev,
      sessions: {
        ...prev.sessions,
        [sessionId]: {
          ...prev.sessions[sessionId],
          completed: true,
          completedAt: new Date().toISOString(),
        },
      },
      currentSession: Math.min(sessionId + 1, 6),
    }));
  }, []);

  const getSessionData = useCallback((sessionId: number) => {
    return state.sessions[sessionId] || DEFAULT_STATE.sessions[1];
  }, [state.sessions]);

  const isSessionUnlocked = useCallback((sessionId: number) => {
    if (sessionId === 1) return true;
    return state.sessions[sessionId - 1]?.completed || false;
  }, [state.sessions]);

  const getProgress = useCallback(() => {
    const completed = Object.values(state.sessions).filter(s => s.completed).length;
    return Math.round((completed / 6) * 100);
  }, [state.sessions]);

  const setUserName = useCallback((name: string) => {
    setState(prev => ({ ...prev, userName: name, programStarted: true }));
  }, []);

  const resetAll = useCallback(() => {
    setState({ ...DEFAULT_STATE });
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    state,
    updateSession,
    updateExerciseData,
    completeSession,
    getSessionData,
    isSessionUnlocked,
    getProgress,
    setUserName,
    resetAll,
  };
}
