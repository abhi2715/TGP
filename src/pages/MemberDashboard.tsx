import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutGrid, Mountain, Leaf, Activity, Target, Flame, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useShikharStore } from '../hooks/useShikharStore';
import './MemberDashboard.css';

export default function MemberDashboard() {
  const { userEmail } = useAuth();
  const { getProgress } = useShikharStore();
  const progress = getProgress();
  
  // Dummy streak/activity data for productivity tracking
  const [streak] = useState(3);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  useEffect(() => {
    // In a real app, fetch from backend.
    // For now, derive from Shikhar store or mock data.
    if (progress > 0) {
      setSessionsCompleted(Math.floor((progress / 100) * 6));
    }
  }, [progress]);

  const getDisplayName = () => {
    if (userEmail) {
      const prefix = userEmail.split('@')[0].replace(/[^a-zA-Z]/g, ' ').trim().split(' ')[0];
      return prefix.charAt(0).toUpperCase() + prefix.slice(1).toLowerCase();
    }
    return 'Member';
  };
  const displayName = getDisplayName();

  return (
    <div className="member-dashboard">
      <div className="container">
        <motion.div 
          className="member-dashboard-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Welcome back, {displayName} 👋</h1>
          <p>Your central hub for leadership growth and personal productivity.</p>
        </motion.div>

        {/* Productivity Overview */}
        <motion.div 
          className="productivity-overview"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="stat-card glass-card">
            <div className="stat-icon" style={{ background: 'rgba(218,165,32,0.1)', color: 'var(--color-gold)' }}>
              <Flame size={24} />
            </div>
            <div className="stat-content">
              <h3>{streak} Days</h3>
              <p>Current Streak</p>
            </div>
          </div>
          
          <div className="stat-card glass-card">
            <div className="stat-icon" style={{ background: 'rgba(85,107,47,0.1)', color: 'var(--color-dark-green)' }}>
              <Target size={24} />
            </div>
            <div className="stat-content">
              <h3>{sessionsCompleted}</h3>
              <p>Sessions Completed</p>
            </div>
          </div>

          <div className="stat-card glass-card">
            <div className="stat-icon" style={{ background: 'rgba(0,0,0,0.05)', color: 'var(--color-primary)' }}>
              <Activity size={24} />
            </div>
            <div className="stat-content">
              <h3>Active</h3>
              <p>Platform Status</p>
            </div>
          </div>
        </motion.div>

        {/* Applications */}
        <div className="apps-section">
          <motion.div 
            className="apps-section-title"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <LayoutGrid size={24} />
            <h2>My Applications</h2>
          </motion.div>

          <div className="apps-grid">
            {/* Shikhar App Card */}
            <motion.div 
              className="app-card glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="app-icon-wrap" style={{ background: 'var(--color-primary)', color: 'white' }}>
                <Mountain size={28} />
              </div>
              <h2>Shikhar Program</h2>
              <p>Your 6-session structured leadership journey. Build your vision, conquer limiting beliefs, and map your career trajectory.</p>
              
              <div className="app-progress">
                <div className="app-progress-label">
                  <span>Overall Progress</span>
                  <span style={{ color: 'var(--color-gold)' }}>{progress}%</span>
                </div>
                <div className="app-progress-bar">
                  <div 
                    className="app-progress-fill" 
                    style={{ width: `${progress}%`, background: 'var(--color-gold)' }} 
                  />
                </div>
              </div>

              <Link to="/shikhar" className="launch-btn" style={{ background: 'var(--color-primary)', color: 'white' }}>
                Launch Shikhar <ArrowRight size={18} />
              </Link>
            </motion.div>

            {/* Unfolding App Card */}
            <motion.div 
              className="app-card glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="app-icon-wrap" style={{ background: 'var(--shikhar-olive-light)', color: 'white' }}>
                <Leaf size={28} />
              </div>
              <h2>Unfolding</h2>
              <p>Your daily growth companion. Track your habits, reflect on your day, and manage your productivity in one place.</p>
              
              <div className="app-progress">
                <div className="app-progress-label">
                  <span>Daily Tasks</span>
                  <span style={{ color: 'var(--shikhar-olive)' }}>Active</span>
                </div>
                <div className="app-progress-bar">
                  <div 
                    className="app-progress-fill" 
                    style={{ width: '100%', background: 'var(--shikhar-olive)' }} 
                  />
                </div>
              </div>

              <Link to="/unfolding-app" className="launch-btn" style={{ background: 'var(--shikhar-olive-light)', color: 'white' }}>
                Launch Unfolding <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
