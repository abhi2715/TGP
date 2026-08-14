
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
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ScrollReveal direction="3d-up" delay={0.2}>
              <div className="contact-form-wrapper glass-card text-center">
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
