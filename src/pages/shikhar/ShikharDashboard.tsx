import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass, Brain, Rocket, Users, MessageCircle, Award,
  ChevronRight, Lock, CheckCircle2, Mountain, Star, BookOpen, Leaf, ArrowRight, Download, LogOut, Trash2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useShikharStore } from '../../hooks/useShikharStore';
import { generateCertificate } from '../../utils/generateCertificate';
import './ShikharDashboard.css';

const SESSIONS = [
  {
    id: 1,
    title: 'Leadership Vision',
    subtitle: 'Define your leadership purpose and values',
    icon: <Compass size={28} />,
    color: 'var(--shikhar-olive)',
    exerciseName: 'Vision Builder',
    description: 'Set intentions, articulate your 5/10 year vision, and define the values that will guide your journey.',
  },
  {
    id: 2,
    title: 'Leading Self',
    subtitle: 'Identify strengths and transform limiting beliefs',
    icon: <Brain size={28} />,
    color: 'var(--shikhar-olive-light)',
    exerciseName: 'Belief Transformer',
    description: 'Discover your inner strengths, confront self-limiting beliefs, and reframe your narratives.',
  },
  {
    id: 3,
    title: 'Career Strategy',
    subtitle: 'Map your career trajectory and success markers',
    icon: <Rocket size={28} />,
    color: 'var(--shikhar-gold)',
    exerciseName: 'Career Compass',
    description: 'Build your personal brand, set SMART goals, and create decision-making frameworks.',
  },
  {
    id: 4,
    title: 'Influence & Visibility',
    subtitle: 'Develop influence strategies in your organization',
    icon: <Users size={28} />,
    color: 'var(--shikhar-olive-dark)',
    exerciseName: 'Stakeholder Map',
    description: 'Map your stakeholders, build strategic relationships, and identify your village.',
  },
  {
    id: 5,
    title: 'Communication for Impact',
    subtitle: 'Build executive presence through communication',
    icon: <MessageCircle size={28} />,
    color: 'var(--shikhar-olive-lighter)',
    exerciseName: 'Presence Builder',
    description: 'Assess your executive presence, create a 6-12 month plan, and refine communication.',
  },
  {
    id: 6,
    title: 'Networking & Future Path',
    subtitle: 'Action plan, reflection, and celebrating growth',
    icon: <Award size={28} />,
    color: 'var(--shikhar-gold-dark)',
    exerciseName: 'Growth Reflector',
    description: 'Reflect on your journey, build your action plan, and make commitments for the future.',
  },
];

export default function ShikharDashboard() {
  const { userName, logout } = useAuth();
  const { state, isSessionUnlocked, getProgress, setUserName, resetAll } = useShikharStore();
  const [nameInput, setNameInput] = useState('');
  const progress = getProgress();

  const getDisplayName = () => {
    if (state.userName) return state.userName;
    if (userName && userName !== 'Leader') return userName;
    return 'Leader';
  };
  const displayName = getDisplayName();

  if (!state.programStarted) {
    return (
      <div className="shikhar-welcome-page">
        <div className="welcome-bg" />
        <motion.div
          className="welcome-card"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="welcome-icon">🏔️</div>
          <h1>Welcome to <span>Shikhar</span></h1>
          <p>Your journey to the summit of leadership begins here. Six sessions. Six transformations. One powerful you.</p>
          <div className="welcome-input-wrap">
            <input
              type="text"
              placeholder="Enter your name to begin..."
              value={nameInput}
              onChange={e => setNameInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && nameInput.trim() && setUserName(nameInput.trim())}
              className="welcome-input"
              autoFocus
            />
            <button
              className="shikhar-btn primary"
              onClick={() => nameInput.trim() && setUserName(nameInput.trim())}
              disabled={!nameInput.trim()}
            >
              Begin Your Journey <ChevronRight size={18} />
            </button>
          </div>
          <div className="welcome-features">
            <div className="welcome-feature">
              <BookOpen size={20} />
              <span>6 Interactive Sessions</span>
            </div>
            <div className="welcome-feature">
              <Star size={20} />
              <span>Hands-on Exercises</span>
            </div>
            <div className="welcome-feature">
              <Mountain size={20} />
              <span>Leadership Growth</span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="shikhar-dashboard paripakv-bg-wrap">
      <div className="paripakv-bg" style={{ backgroundImage: "url('/shikhar-mountain-bg.png')", position: 'fixed' }} />
      <div className="paripakv-overlay" style={{ position: 'fixed', zIndex: 0 }} />
      
      {/* Hero */}
      <div className="dashboard-hero" style={{ zIndex: 1 }}>
        <div className="dashboard-hero-bg" />
        <div className="container dashboard-hero-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="dashboard-greeting" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mountain size={24} />
                <span>SHIKHAR PROGRAM</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  onClick={() => {
                    if(window.confirm('Are you sure you want to reset all your progress? This will wipe your account data permanently.')) {
                      resetAll();
                    }
                  }}
                  style={{
                    background: 'rgba(255, 59, 48, 0.1)',
                    border: '1px solid rgba(255, 59, 48, 0.2)',
                    borderRadius: '8px',
                    padding: '0.5rem 1rem',
                    color: '#d32f2f',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 59, 48, 0.2)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 59, 48, 0.1)'}
                >
                  <Trash2 size={16} />
                  Reset
                </button>
                <button 
                  onClick={() => logout()}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    padding: '0.5rem 1rem',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    backdropFilter: 'blur(10px)',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
            <h1>Welcome back, {displayName} 👋</h1>
            <p className="dashboard-tagline">Continue your leadership journey. Each session builds on the last.</p>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            className="dashboard-progress-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="progress-header">
              <span className="progress-label">Overall Progress</span>
              <span className="progress-value">{progress}%</span>
            </div>
            <div className="progress-track">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <div className="progress-milestones">
              {[1, 2, 3, 4, 5, 6].map(n => (
                <div
                  key={n}
                  className={`milestone ${state.sessions[n]?.completed ? 'done' : ''}`}
                >
                  {state.sessions[n]?.completed ? <CheckCircle2 size={14} /> : n}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container dashboard-main-content">
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="sessions-grid-wrapper"
        >
          <div className="dashboard-section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2>Your Sessions</h2>
              <p>{progress === 100 ? 'You have successfully completed all sessions!' : 'Complete each session to unlock the next one'}</p>
            </div>
            {progress === 100 && (
              <button 
                onClick={() => generateCertificate(displayName, new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }))}
                className="shikhar-btn primary"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--color-gold)', color: 'var(--color-bg)' }}
              >
                <Download size={18} />
                Download Certificate
              </button>
            )}
          </div>

          <div className="sessions-grid">
            <AnimatePresence>
              {SESSIONS.map((session, index) => {
                const unlocked = isSessionUnlocked(session.id);
                const completed = state.sessions[session.id]?.completed;

                return (
                  <motion.div
                    key={session.id}
                    className={`session-card ${unlocked ? 'unlocked' : 'locked'} ${completed ? 'completed' : ''}`}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={unlocked ? { y: -8, transition: { duration: 0.2 } } : {}}
                  >
                    {unlocked ? (
                      <Link to={`/shikhar/session/${session.id}`} className="session-card-link">
                        <div className="session-card-top" style={{ '--accent': session.color } as React.CSSProperties}>
                          <div className="session-card-number">
                            {completed ? <CheckCircle2 size={20} /> : session.id}
                          </div>
                          <div className="session-card-icon">{session.icon}</div>
                        </div>
                        <div className="session-card-content">
                          <h3>{session.title}</h3>
                          <p className="session-card-subtitle">{session.subtitle}</p>
                          <p className="session-card-desc">{session.description}</p>
                          <div className="session-card-footer">
                            <span className="exercise-tag">
                              <Star size={12} /> {session.exerciseName}
                            </span>
                            <span className={`session-status ${completed ? 'done' : 'pending'}`}>
                              {completed ? '✓ Completed' : 'Start →'}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <div className="session-card-link locked-card">
                        <div className="session-card-top locked-top">
                          <div className="session-card-number locked-num">{session.id}</div>
                          <Lock size={24} className="lock-icon" />
                        </div>
                        <div className="session-card-content">
                          <h3>{session.title}</h3>
                          <p className="session-card-subtitle">{session.subtitle}</p>
                          <p className="session-locked-msg">Complete Session {session.id - 1} to unlock</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Unfolding App Banner */}
          <motion.div
            className="unfolding-banner"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{ 
              marginTop: '2rem', 
              background: 'rgba(255, 255, 255, 0.03)', 
              borderRadius: '24px', 
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <div style={{ background: 'var(--shikhar-olive)', color: 'white', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
              <Leaf size={32} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '0.25rem', color: 'var(--shikhar-olive)' }}>Unfolding</h2>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--shikhar-gold)', marginBottom: '1rem', fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase' }}>Self Healing App</h3>
            <p style={{ maxWidth: '600px', marginBottom: '2rem', color: '#4a4a4a', fontSize: '1.05rem', lineHeight: '1.6' }}>
              Your daily growth companion. Track your habits, reflect on your day, and manage your productivity in one place.
            </p>
            <Link 
              to="/unfolding-app" 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.75rem', 
                background: 'var(--shikhar-olive)', 
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '1.05rem',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'none'}
            >
              Launch Unfolding <ArrowRight size={20} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Program Info */}
        <motion.div
          className="program-info-strip"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="info-item">
            <span className="info-number">6</span>
            <span className="info-text">Sessions</span>
          </div>
          <div className="info-divider" />
          <div className="info-item">
            <span className="info-number">~55</span>
            <span className="info-text">Mins Each</span>
          </div>
          <div className="info-divider" />
          <div className="info-item">
            <span className="info-number">6</span>
            <span className="info-text">Interactive Exercises</span>
          </div>
          <div className="info-divider" />
          <div className="info-item">
            <span className="info-number">∞</span>
            <span className="info-text">Growth Potential</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
