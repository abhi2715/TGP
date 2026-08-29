import { Link } from 'react-router-dom';
import { Mail, Link as LinkIcon } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src="/logo.png?v=3" alt="The Growth Project" />
            </Link>
            <p className="footer-description">
              Empowering the next generation of global leaders with authenticity, resilience, and strategic clarity.
            </p>
            <div className="social-links">
              <a href="https://www.linkedin.com/in/poojasharma72" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkIcon size={20} />
              </a>
              <a href="mailto:contact.thegrowthproject.tgp@gmail.com" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div className="footer-links-group">
            <h4>Explore</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">My Story</Link></li>
              <li><Link to="/programmes">Programmes</Link></li>
              <li><Link to="/success-stories">Success Stories</Link></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/shikhar">Member Login: Shikhar</Link></li>
              <li><Link to="/resources">Resources</Link></li>
              <li><Link to="/contact">Get in touch</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
            </ul>
          </div>

          <div className="footer-newsletter">
            <h4>Stay Connected</h4>
            <p>Join our community for insights on leadership, growth, and upcoming programmes.</p>
            <Link to="/contact" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem', marginTop: '1rem' }}>
              Get in Touch
            </Link>
            <p className="mt-4" style={{ color: '#ffffff', fontWeight: 600 }}>
              contact.thegrowthproject.tgp@gmail.com
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} The Growth Project. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
