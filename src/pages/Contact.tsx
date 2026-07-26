import { Mail, Link as LinkIcon } from 'lucide-react';
import ScrollReveal from '../components/ui/ScrollReveal';
import MagneticButton from '../components/ui/MagneticButton';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="page-header text-center" style={{ padding: '8rem 0 4rem' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <ScrollReveal direction="up" delay={0.1}>
            <span className="about-tag" style={{ marginBottom: '1.5rem' }}>Get in Touch</span>
            <h1>Let's Get Started!</h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <p className="subtitle" style={{ color: 'var(--color-text)' }}>
              We'd love to hear from you. Reach out to discuss how we can help.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <section className="section section-decorated pt-0">
        <div className="container contact-container">
          <ScrollReveal direction="3d-up" delay={0.3}>
            <div className="contact-info-wrapper">
              <div className="contact-card text-center glass-card">
                <h2>The Growth Project</h2>
                <h3 className="contact-name">Dr. Pooja Sharma</h3>
                
                <div className="contact-methods">
                  <MagneticButton>
                    <a href="mailto:contact.thegrowthproject@gmail.com" className="contact-method">
                      <div className="contact-icon"><Mail size={24} /></div>
                      <div className="contact-text">
                        <span>Email</span>
                        <strong>contact.thegrowthproject@gmail.com</strong>
                      </div>
                    </a>
                  </MagneticButton>
                  
                  <MagneticButton>
                    <a href="https://www.linkedin.com/in/poojasharma72" target="_blank" rel="noopener noreferrer" className="contact-method">
                      <div className="contact-icon"><LinkIcon size={24} /></div>
                      <div className="contact-text">
                        <span>LinkedIn</span>
                        <strong>linkedin.com/in/poojasharma72</strong>
                      </div>
                    </a>
                  </MagneticButton>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Contact;
