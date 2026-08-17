import { Link } from 'react-router-dom';
import { MessageSquare, Compass, ShieldCheck } from 'lucide-react';
import './Services.css';

const Mentorship = () => {
  return (
    <div className="service-page">
      <section className="service-hero">
        <div className="container">
          <span className="service-tag">1-on-1 Mentorship</span>
          <h1>Guidance from those who have walked the path.</h1>
          <p className="hero-sub">
            Accelerate your growth with personalized, high-impact mentorship from seasoned executives and industry leaders.
          </p>
          <div className="cta-group">
            <Link to="/book-consultation" className="btn btn-primary">Book a conversation</Link>
            <Link to="/programmes" className="btn btn-secondary">Explore programmes</Link>
          </div>
        </div>
      </section>

      <section className="section benefits">
        <div className="container">
          <div className="section-header text-center">
            <h2>Why Mentorship Matters</h2>
          </div>
          <div className="service-benefits">
            <div className="benefit-card">
              <Compass size={32} color="var(--color-secondary)" />
              <h3>Blindspot Navigation</h3>
              <p>Identify and overcome the hidden barriers that are silently stalling your progress.</p>
            </div>
            <div className="benefit-card">
              <ShieldCheck size={32} color="var(--color-secondary)" />
              <h3>Safe Sounding Board</h3>
              <p>Test your boldest ideas in a confidential, zero-risk environment before executing them.</p>
            </div>
            <div className="benefit-card">
              <MessageSquare size={32} color="var(--color-secondary)" />
              <h3>Unvarnished Truth</h3>
              <p>Receive the honest, direct feedback that your colleagues and employees hesitate to give.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section framework-section">
        <div className="container">
          <div className="section-header text-center">
            <h2>The Mentorship Framework</h2>
            <p>Our structured approach ensures every session drives tangible results.</p>
          </div>
          <div className="framework-grid">
            <div className="framework-step">
              <div className="step-num">01</div>
              <div className="step-content">
                <h3>The Deep Dive Audit</h3>
                <p>We start by unpacking your current reality, career history, and ultimate aspirations.</p>
              </div>
            </div>
            <div className="framework-step">
              <div className="step-num">02</div>
              <div className="step-content">
                <h3>Goal Architecture</h3>
                <p>Translating vague ambitions into a concrete, measurable roadmap for the next 12 months.</p>
              </div>
            </div>
            <div className="framework-step">
              <div className="step-num">03</div>
              <div className="step-content">
                <h3>Strategic Sprints</h3>
                <p>Bi-weekly tactical sessions to solve immediate challenges and maintain momentum.</p>
              </div>
            </div>
            <div className="framework-step">
              <div className="step-num">04</div>
              <div className="step-content">
                <h3>Evolution Review</h3>
                <p>Quarterly assessments to measure growth, recalibrate goals, and celebrate wins.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section case-studies">
        <div className="container">
          <div className="section-header text-center">
            <h2>Impact Stories</h2>
          </div>
          <div className="cs-grid">
            <div className="cs-card">
              <div className="cs-metric">2.5x</div>
              <span className="cs-metric-label">Revenue Growth in 18 Months</span>
              <p className="cs-quote">"My mentor didn't just give advice; she completely rewired how I approached scaling my agency. The clarity was invaluable."</p>
              <p className="cs-author">James T., Agency Founder</p>
            </div>
            <div className="cs-card">
              <div className="cs-metric">VP</div>
              <span className="cs-metric-label">Promotion Secured</span>
              <p className="cs-quote">"I was stuck at the Director level for 4 years. Six months of mentorship helped me develop the executive presence I was missing."</p>
              <p className="cs-author">Elena R., Tech Executive</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section final-cta bg-surface text-center">
        <div className="container">
          <h2>Find your perfect match.</h2>
          <p>Our matching algorithm pairs you with a mentor whose experience aligns perfectly with your goals.</p>
          <div className="cta-group center">
            <Link to="/book-consultation" className="btn btn-primary">Book a conversation</Link>
            <Link to="/programmes" className="btn btn-secondary">Explore programmes</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Mentorship;
