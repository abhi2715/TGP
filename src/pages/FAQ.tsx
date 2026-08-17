import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const faqs = [
    {
      q: "What is the typical duration of a coaching programme?",
      a: "Our core programmes generally run for 3 to 6 months. We find this allows enough time for deep neurological habit rewiring and tangible career results. However, we also offer shorter intensives and long-term retainer options for alumni."
    },
    {
      q: "Are the sessions virtual or in-person?",
      a: "The majority of our coaching and mentorship sessions are conducted virtually via Zoom to accommodate our global client base. However, we do host in-person retreats and regional mastermind events throughout the year."
    },
    {
      q: "How do you match clients with mentors?",
      a: "We use a rigorous matching process that goes beyond industry alignment. During your discovery phase, we assess your core values, learning style, and specific goals, then pair you with a mentor whose background and coaching style complement your needs."
    },
    {
      q: "Can my company sponsor my coaching?",
      a: "Yes, absolutely. Over 60% of our clients have their programmes fully or partially sponsored by their employers as part of their professional development or executive training budgets. We can provide documentation to assist with this request."
    },
    {
      q: "What is your refund policy?",
      a: "We offer a 14-day satisfaction guarantee for all our core programmes. If after the first two weeks you feel the programme is not a fit, we will issue a full refund, no questions asked."
    },
    {
      q: "I'm not in the C-suite yet. Are these programmes for me?",
      a: "Yes. While we do work with established executives, many of our programmes (like Career Growth) are specifically designed for mid-level managers and directors who are looking to accelerate their trajectory into senior leadership roles."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      <section className="contact-hero bg-surface text-center">
        <div className="container">
          <HelpCircle size={48} color="var(--color-secondary)" className="mb-2 mx-auto" />
          <h1>Frequently Asked Questions</h1>
          <p className="hero-sub">
            Everything you need to know about our programmes, methodology, and logistics.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="faq-accordion">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`faq-item ${openIndex === idx ? 'open' : ''}`}
                style={{ 
                  borderBottom: '1px solid var(--color-border)', 
                  padding: '1.5rem 0'
                }}
              >
                <button 
                  className="faq-question"
                  onClick={() => toggleFAQ(idx)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    fontSize: '1.125rem',
                    fontWeight: '500',
                    color: openIndex === idx ? 'var(--color-secondary)' : 'var(--color-text)',
                    cursor: 'pointer',
                    padding: '0'
                  }}
                >
                  {faq.q}
                  {openIndex === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {openIndex === idx && (
                  <div className="faq-answer" style={{ paddingTop: '1rem', color: 'var(--color-text)', lineHeight: '1.6' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-5" style={{ marginTop: '4rem' }}>
            <h3>Still have questions?</h3>
            <p className="mb-3 text-muted">We're here to help clarify anything you need.</p>
          <div className="cta-group center">
            <Link to="/book-consultation" className="btn btn-primary">Book a conversation</Link>
            <Link to="/programmes" className="btn btn-secondary">Explore programmes</Link>
          </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
