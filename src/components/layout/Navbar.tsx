import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';
import './Navbar.css';

const SECTIONS = ['home', 'about', 'pillars', 'mentor', 'cta'];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  const navbarClass = `navbar ${isScrolled ? 'scrolled' : ''}`;

  return (
    <header className={navbarClass}>
      <div className="navbar-container container">
        <Link to="/" className="navbar-logo">
          <img src="/logo.png?v=4" alt="The Growth Project" />
        </Link>

        <nav className={`navbar-links ${isMobileMenuOpen ? 'open' : ''}`}>
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
          <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>My Story</Link>
          <Link to="/programmes" className={`nav-link ${isActive('/programmes') ? 'active' : ''}`}>Programmes</Link>
          <Link to="/resources" className={`nav-link ${isActive('/resources') ? 'active' : ''}`}>Resources</Link>
          <Link to="/success-stories" className={`nav-link ${isActive('/success-stories') ? 'active' : ''}`}>Success Stories</Link>
          <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>Get in Touch</Link>
          
          <div className="mobile-cta">
            <Link to="/book-consultation" className="btn btn-primary" style={{ marginBottom: '1rem' }}>Book a conversation</Link>
            <Link to="/shikhar" className={`nav-link nav-link-shikhar mobile-only-link ${location.pathname.includes('/shikhar') ? 'active' : ''}`} style={{ display: 'block', textAlign: 'center' }}>MEMBER LOGIN</Link>
          </div>
        </nav>

        <div className="navbar-actions">
          <MagneticButton>
            <Link to="/book-consultation" className="btn btn-primary desktop-cta">
              Book a conversation
            </Link>
          </MagneticButton>
          <Link to="/shikhar" className={`nav-link nav-link-shikhar desktop-only-link ${location.pathname.includes('/shikhar') ? 'active' : ''}`}>MEMBER LOGIN</Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-btn" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
