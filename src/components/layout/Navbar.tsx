import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

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
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/programmes" className="nav-link">Programmes</Link>
          <Link to="/shikhar" className="nav-link nav-link-shikhar">Shikhar</Link>
          <Link to="/resources" className="nav-link">Resources</Link>
          <Link to="/success-stories" className="nav-link">Success Stories</Link>
          <Link to="/contact" className="nav-link">Get in touch</Link>
          
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
