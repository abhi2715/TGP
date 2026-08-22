import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, Mail, User, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { requestShikharAccess, loginShikhar } from '../lib/api';
import './Login.css';

const Login = () => {
  const [mode, setMode] = useState<'login' | 'request'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginWithEmail } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const result = await loginShikhar(email, password);
      if (result.status === 'approved' && result.sessionToken) {
        loginWithEmail(email, result.sessionToken, result.user?.name || 'Leader', result.shikharState, result.unlockedSessions);
        navigate('/shikhar');
      } else if (result.status === 'pending') {
        setError('Your access request is still pending approval. Please wait for admin confirmation.');
      } else if (result.status === 'denied') {
        setError('Your access request was denied. Please contact us for more information.');
      } else {
        setError(result.error || 'Login failed. Please check your credentials.');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const result = await requestShikharAccess({ name, email, phone, password });
      if (result.status === 'approved' && result.sessionToken) {
        loginWithEmail(email, result.sessionToken, result.user?.name || 'Leader', result.shikharState, result.unlockedSessions);
        navigate('/shikhar');
      } else {
        setSuccess(result.message || 'Access request submitted! You will be notified once approved.');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg" />
      <div className="container login-container">
        <div className="login-card glass-card-dark">
          <div className="login-header">
            <div className="login-icon-wrapper">
              <Lock size={28} className="text-gold" />
            </div>
            <h2>Shikhar Access</h2>
            <p>{mode === 'login' ? 'Sign in with your approved email to access Shikhar.' : 'Request access to the Shikhar programme.'}</p>
          </div>

          {/* Mode Toggle */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', background: 'rgba(0,0,0,0.05)', borderRadius: '100px', padding: '0.35rem' }}>
            <button
              type="button"
              onClick={() => { setMode('login'); setError(''); setSuccess(''); }}
              style={{
                flex: 1, padding: '0.6rem', borderRadius: '100px', border: 'none',
                background: mode === 'login' ? 'var(--color-secondary)' : 'transparent',
                color: mode === 'login' ? '#0F1117' : 'var(--color-text-muted)',
                fontWeight: 600, fontSize: '0.8125rem', cursor: 'pointer',
                fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease',
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('request'); setError(''); setSuccess(''); }}
              style={{
                flex: 1, padding: '0.6rem', borderRadius: '100px', border: 'none',
                background: mode === 'request' ? 'var(--color-secondary)' : 'transparent',
                color: mode === 'request' ? '#0F1117' : 'var(--color-text-muted)',
                fontWeight: 600, fontSize: '0.8125rem', cursor: 'pointer',
                fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease',
              }}
            >
              Request Access
            </button>
          </div>

          {error && (
            <div style={{ background: 'rgba(248, 113, 113, 0.15)', color: '#F87171', padding: '0.75rem 1rem', borderRadius: '10px', fontSize: '0.8125rem', marginBottom: '1rem', textAlign: 'center' }}>
              {error}
            </div>
          )}

          {success && (
            <div style={{ background: 'rgba(52, 211, 153, 0.15)', color: '#34D399', padding: '0.75rem 1rem', borderRadius: '10px', fontSize: '0.8125rem', marginBottom: '1rem', textAlign: 'center' }}>
              {success}
            </div>
          )}

          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="login-form">
              <div className="input-group">
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--shikhar-olive)' }} />
                  <input
                    type="email"
                    placeholder="Enter your approved email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                    style={{ paddingLeft: '44px' }}
                    autoFocus
                    required
                  />
                </div>
                <div style={{ position: 'relative', marginTop: '1rem' }}>
                  <Lock size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--shikhar-olive)' }} />
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                    style={{ paddingLeft: '44px' }}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="shikhar-btn primary" style={{ width: '100%', marginTop: '0.5rem', justifyContent: 'center' }} disabled={loading}>
                {loading ? 'Checking...' : 'Access Shikhar'} <ArrowRight size={18} />
              </button>
            </form>
          ) : (
            <form onSubmit={handleRequest} className="login-form">
              <div className="input-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--shikhar-olive)' }} />
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="login-input"
                    style={{ paddingLeft: '44px' }}
                    required
                  />
                </div>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--shikhar-olive)' }} />
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                    style={{ paddingLeft: '44px' }}
                    required
                  />
                </div>
                <div style={{ position: 'relative' }}>
                  <Phone size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--shikhar-olive)' }} />
                  <input
                    type="tel"
                    placeholder="Phone number (optional)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="login-input"
                    style={{ paddingLeft: '44px' }}
                  />
                </div>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--shikhar-olive)' }} />
                  <input
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                    style={{ paddingLeft: '44px' }}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="shikhar-btn primary" style={{ width: '100%', marginTop: '0.5rem', justifyContent: 'center' }} disabled={loading}>
                {loading ? 'Submitting...' : 'Request Access'} <ArrowRight size={18} />
              </button>
            </form>
          )}

          <div className="login-footer" style={{ textAlign: 'center', marginTop: '2rem' }}>
            <p>Need help? <a href="/contact">Contact us</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
