import { CheckCircle, Star } from 'lucide-react';
import ScrollReveal from '../components/ui/ScrollReveal';
import './Contact.css'; 
import './BookConsultation.css';

const BookConsultation = () => {
  // Calendly script removed in favor of Google Form

  return (
    <div className="booking-page">
      <div className="page-header text-center" style={{ padding: '8rem 0 4rem' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <ScrollReveal direction="up" delay={0.1}>
            <span className="about-tag" style={{ marginBottom: '1.5rem' }}>Strategic Alignment</span>
            <h1>Book a conversation</h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <p className="subtitle" style={{ maxWidth: '700px', margin: '0 auto', color: 'var(--color-text)' }}>
              Take the first step towards accelerating your leadership journey.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <section className="section section-decorated pt-0">
        <div className="container">
          <div className="booking-grid">
            <ScrollReveal direction="3d-left" delay={0.2}>
              <div className="booking-info glass-card">
                <h2>What to Expect</h2>
                <p className="mb-4" style={{ color: 'var(--color-text)' }}>
                  This isn't a high-pressure sales call. It's a diagnostic session to see if our methodologies align with your current challenges.
                </p>
                
                <ul className="who-list mb-4">
                  <li><CheckCircle size={20} className="text-gold" /> Clarity on your immediate leadership or career roadblocks</li>
                  <li><CheckCircle size={20} className="text-gold" /> An overview of which programme or mentor fits you best</li>
                  <li><CheckCircle size={20} className="text-gold" /> Actionable advice you can implement immediately</li>
                </ul>

                <div className="cs-card mt-4" style={{ background: 'rgba(218,165,32,0.05)', border: '1px solid rgba(218,165,32,0.2)', padding: '2rem', borderRadius: '16px' }}>
                  <div className="stars mb-2" style={{ display: 'flex', gap: '0.25rem' }}>
                    <Star size={16} fill="var(--color-secondary)" color="var(--color-secondary)" />
                    <Star size={16} fill="var(--color-secondary)" color="var(--color-secondary)" />
                    <Star size={16} fill="var(--color-secondary)" color="var(--color-secondary)" />
                    <Star size={16} fill="var(--color-secondary)" color="var(--color-secondary)" />
                    <Star size={16} fill="var(--color-secondary)" color="var(--color-secondary)" />
                  </div>
                  <p className="cs-quote" style={{ fontSize: '1.05rem', fontStyle: 'italic', marginBottom: '1rem' }}>
                    "Even the initial consultation call gave me more clarity than months of trying to figure it out alone."
                  </p>
                  <p className="cs-author" style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-primary)' }}>
                    - Arjun K., Director of Product
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="3d-right" delay={0.3}>
              <div className="contact-form-wrapper glass-card text-center" style={{ height: '100%' }}>
                <h2 className="mb-2">Request a Consultation</h2>
                <p className="mb-4" style={{ color: 'var(--color-text)' }}>Fill out the form below and we will reach out to schedule a slot.</p>
                
                <iframe 
                  src="https://docs.google.com/forms/d/e/1FAIpQLSc-YOUR-FORM-ID-HERE/viewform?embedded=true" 
                  width="100%" 
                  height="550" 
                  frameBorder="0" 
                  marginHeight={0} 
                  marginWidth={0}
                  style={{ border: 'none', borderRadius: '12px', background: 'white' }}
                >
                  Loading form...
                </iframe>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookConsultation;
