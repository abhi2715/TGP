import { Link } from 'react-router-dom';
import { Brain, BatteryCharging, Sunrise } from 'lucide-react';
import './Services.css';

const PersonalDevelopment = () => {
  return (
    <div className="service-page">
      <section className="service-hero">
        <div className="container">
          <span className="service-tag">Personal Mastery</span>
          <h1>Become the highest version of yourself.</h1>
          <p className="hero-sub">
            True professional success is built on a foundation of profound personal growth. Master your habits, mindset, and energy.
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
            <h2>The Inner Work</h2>
          </div>
          <div className="service-benefits">
            <div className="benefit-card">
              <Brain size={32} color="var(--color-secondary)" />
              <h3>Cognitive Optimization</h3>
              <p>Rewire limiting beliefs and build a resilient mindset capable of handling high-stress environments.</p>
            </div>
            <div className="benefit-card">
              <BatteryCharging size={32} color="var(--color-secondary)" />
              <h3>Energy Management</h3>
              <p>Move beyond simple time management. Learn how to manage your physical and emotional energy for sustained peak performance.</p>
            </div>
            <div className="benefit-card">
              <Sunrise size={32} color="var(--color-secondary)" />
              <h3>Purpose Alignment</h3>
              <p>Connect your daily actions to a deeper sense of purpose to maintain long-term motivation and fulfillment.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section framework-section">
        <div className="container">
          <div className="section-header text-center">
            <h2>The Mastery Process</h2>
          </div>
          <div className="framework-grid">
            <div className="framework-step">
              <div className="step-num">01</div>
              <div className="step-content">
                <h3>Self-Awareness Audit</h3>
                <p>Identifying your core values, subconscious drivers, and emotional triggers.</p>
              </div>
            </div>
            <div className="framework-step">
              <div className="step-num">02</div>
              <div className="step-content">
                <h3>Habit Engineering</h3>
                <p>Designing and implementing micro-habits that compound into massive life changes over time.</p>
              </div>
            </div>
            <div className="framework-step">
              <div className="step-num">03</div>
              <div className="step-content">
                <h3>Emotional Regulation</h3>
                <p>Techniques for maintaining calm, focus, and empathy in the face of adversity.</p>
              </div>
            </div>
            <div className="framework-step">
              <div className="step-num">04</div>
              <div className="step-content">
                <h3>Life Design</h3>
                <p>Creating a balanced architecture for your life that honors your career, relationships, and well-being.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section case-studies">
        <div className="container">
          <div className="section-header text-center">
            <h2>Life-Changing Results</h2>
          </div>
          <div className="cs-grid">
            <div className="cs-card">
              <div className="cs-metric">Zero</div>
              <span className="cs-metric-label">Burnout Episodes</span>
              <p className="cs-quote">"I was working 80-hour weeks and falling apart. This programme taught me how to achieve more by doing less, but with better focus."</p>
              <p className="cs-author">David W., Startup Founder</p>
            </div>
            <div className="cs-card">
              <div className="cs-metric">100%</div>
              <span className="cs-metric-label">Clarity of Purpose</span>
              <p className="cs-quote">"For the first time in my life, I know exactly what I want and have the confidence to pursue it relentlessly."</p>
              <p className="cs-author">Jessica L., Creative Director</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section final-cta bg-surface text-center">
        <div className="container">
          <h2>Your transformation begins here.</h2>
          <p>Join a community of individuals committed to lifelong growth.</p>
          <div className="cta-group center">
            <Link to="/book-consultation" className="btn btn-primary">Book a conversation</Link>
            <Link to="/programmes" className="btn btn-secondary">Explore programmes</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PersonalDevelopment;
