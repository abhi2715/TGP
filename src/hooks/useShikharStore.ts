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
      // Remove the _userEmail tag from the returned state so it doesn't pollute ShikharState
      const { _userEmail, ...stateData } = parsed;
      return { ...DEFAULT_STATE, ...stateData };
    }
  } catch {
    // ignore
  }
  return { ...DEFAULT_STATE };
}

export function useShikharStore() {
  const { serverShikharState, serverUnlockedSessions, userEmail } = useAuth();

  const [state, setState] = useState<ShikharState>(() => {
    let baseState = loadState();
    if (serverShikharState && Object.keys(serverShikharState).length > 0) {
      const mergedSessions = { ...DEFAULT_STATE.sessions };
      if (serverShikharState.sessions) {
        Object.keys(serverShikharState.sessions).forEach(key => {
          const k = Number(key);
          mergedSessions[k] = {
            ...mergedSessions[k],
            ...serverShikharState.sessions[k],
            exerciseData: serverShikharState.sessions[k]?.exerciseData || mergedSessions[k]?.exerciseData || {}
          };
        });
      }
      baseState = { ...DEFAULT_STATE, ...serverShikharState, sessions: mergedSessions };
    }
    return baseState;
  });

  useEffect(() => {
    if (serverShikharState) {
      if (Object.keys(serverShikharState).length > 0) {
        setState(prev => {
          // Deep merge sessions so we don't lose exerciseData if the server payload is incomplete
          const mergedSessions = { ...DEFAULT_STATE.sessions };
          if (serverShikharState.sessions) {
            Object.keys(serverShikharState.sessions).forEach(key => {
              const k = Number(key);
              mergedSessions[k] = {
                ...mergedSessions[k],
                ...serverShikharState.sessions[k],
                exerciseData: serverShikharState.sessions[k]?.exerciseData || mergedSessions[k]?.exerciseData || {}
              };
            });
          }
          return { ...prev, ...serverShikharState, sessions: mergedSessions };
        });
      } else {
        setState({ ...DEFAULT_STATE });
      }
    }
  }, [serverShikharState]);

  const saveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => {
    // Don't save if no user is logged in
    if (!userEmail) return;

    const currentToken = localStorage.getItem('tgp_session_token');
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      // Tag the cached data with the user's email so we can detect stale data
      const dataToSave = { ...state, _userEmail: userEmail };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      if (userEmail && currentToken) {
        syncShikharState(userEmail, currentToken, state).catch(() => {});
      }
    }, 500);
    return () => clearTimeout(saveTimer.current);
  }, [state, userEmail]);

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
    const sd = state.sessions[sessionId] || DEFAULT_STATE.sessions[1];
    return { ...sd, exerciseData: sd.exerciseData || {} };
  }, [state.sessions]);

  const isSessionUnlocked = useCallback((sessionId: number) => {
    // If we have data from the server, rely STRICTLY on it for unlocking
    if (serverUnlockedSessions && serverUnlockedSessions.length > 0) {
      return serverUnlockedSessions.includes(sessionId);
    }
    
    // Legacy fallback for users without server connection
    if (sessionId === 1) return true;
    return state.sessions[sessionId - 1]?.completed || false;
  }, [state.sessions, serverUnlockedSessions]);

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
