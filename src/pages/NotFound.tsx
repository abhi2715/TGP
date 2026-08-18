import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="not-found-page" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '5rem 2rem',
      backgroundColor: 'var(--color-surface)',
      textAlign: 'center'
    }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        <Compass size={64} color="var(--color-secondary)" style={{ margin: '0 auto 2rem' }} />
        <h1 style={{ fontSize: '4rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>404</h1>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Off the Beaten Path</h2>
        <p style={{ fontSize: '1.125rem', color: 'var(--color-text)', marginBottom: '3rem' }}>
          It seems you've navigated to a page that doesn't exist. Let's get you back on track for your growth journey.
        </p>
        <div className="cta-group center mt-4">
          <Link to="/book-consultation" className="btn btn-primary">Book a conversation</Link>
          <Link to="/programmes" className="btn btn-secondary">Explore programmes</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
