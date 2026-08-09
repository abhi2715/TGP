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

      // Section tracking on homepage
      if (location.pathname === '/') {
        let current = '';
        for (const id of SECTIONS) {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 200) {
              current = id;
            }
          }
        }
        setActiveSection(current);
      } else {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  const navbarClass = `navbar ${isScrolled ? 'scrolled' : ''}`;

  return (
    <header className={navbarClass}>
      <div className="navbar-container container">
        <MagneticButton>
          <Link to="/" className="navbar-logo">
            <img src="/logo.jpg" alt="The Growth Project" />
          </Link>
        </MagneticButton>

        <nav className={`navbar-links ${isMobileMenuOpen ? 'open' : ''}`}>
          <Link to="/" className={`nav-link ${isActive('/') && (activeSection === 'home' || !activeSection) ? 'active' : ''}`}>Home</Link>
          <Link to="/about" className={`nav-link ${isActive('/about') || activeSection === 'about' ? 'active' : ''}`}>My Story</Link>
          <Link to="/programmes" className={`nav-link ${isActive('/programmes') ? 'active' : ''}`}>Programmes</Link>
          <Link to="/shikhar" className={`nav-link nav-link-shikhar ${location.pathname.includes('/shikhar') ? 'active' : ''}`}>Member Login: Shikhar</Link>
          <Link to="/resources" className={`nav-link ${isActive('/resources') ? 'active' : ''}`}>Resources</Link>
          <Link to="/success-stories" className={`nav-link ${isActive('/success-stories') ? 'active' : ''}`}>Success Stories</Link>
          <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>Get in touch</Link>
          
          <div className="mobile-cta">
            <Link to="/book-consultation" className="btn btn-primary">Book a conversation</Link>
          </div>
        </nav>

        <div className="navbar-actions">
          <MagneticButton>
            <Link to="/book-consultation" className="btn btn-primary desktop-cta">
              Book a conversation
            </Link>
          </MagneticButton>
          
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
