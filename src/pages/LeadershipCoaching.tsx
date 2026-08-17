import { Link } from 'react-router-dom';
import { Anchor, Target, Zap } from 'lucide-react';
import './Services.css';

const LeadershipCoaching = () => {
  return (
    <div className="service-page">
      <section className="service-hero">
        <div className="container">
          <span className="service-tag">Executive Coaching</span>
          <h1>Lead with clarity, command, and impact.</h1>
          <p className="hero-sub">
            Bespoke coaching for senior leaders navigating complex organizational challenges and driving strategic transformation.
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
            <h2>The Executive Edge</h2>
          </div>
          <div className="service-benefits">
            <div className="benefit-card">
              <Anchor size={32} color="var(--color-secondary)" />
              <h3>Executive Presence</h3>
              <p>Develop the gravitas to command any room and inspire unwavering confidence from your board to your front line.</p>
            </div>
            <div className="benefit-card">
              <Target size={32} color="var(--color-secondary)" />
              <h3>Strategic Execution</h3>
              <p>Bridge the gap between high-level vision and on-the-ground operational reality.</p>
            </div>
            <div className="benefit-card">
              <Zap size={32} color="var(--color-secondary)" />
              <h3>Crisis Resilience</h3>
              <p>Maintain clarity and make decisive, effective decisions when under immense pressure.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section framework-section">
        <div className="container">
          <div className="section-header text-center">
            <h2>The Transformation Roadmap</h2>
          </div>
          <div className="framework-grid">
            <div className="framework-step">
              <div className="step-num">01</div>
              <div className="step-content">
                <h3>360° Assessment</h3>
                <p>We gather comprehensive feedback from peers, superiors, and direct reports to establish a baseline.</p>
              </div>
            </div>
            <div className="framework-step">
              <div className="step-num">02</div>
              <div className="step-content">
                <h3>Behavioral Mapping</h3>
                <p>Identifying the specific behaviors that need to shift to unlock your next level of leadership capacity.</p>
              </div>
            </div>
            <div className="framework-step">
              <div className="step-num">03</div>
              <div className="step-content">
                <h3>Active Coaching</h3>
                <p>Intensive 1-on-1 sessions focusing on real-time challenges and applying new leadership frameworks.</p>
              </div>
            </div>
            <div className="framework-step">
              <div className="step-num">04</div>
              <div className="step-content">
                <h3>Sustainable Integration</h3>
                <p>Ensuring new leadership behaviors become permanent habits embedded in your daily routine.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section case-studies">
        <div className="container">
          <div className="section-header text-center">
            <h2>Client Transformations</h2>
          </div>
          <div className="cs-grid">
            <div className="cs-card">
              <div className="cs-metric">40%</div>
              <span className="cs-metric-label">Increase in Team Retention</span>
              <p className="cs-quote">"The coaching helped me transition from a micromanager to a true strategic leader. The impact on my team's morale was immediate."</p>
              <p className="cs-author">Sarah M., VP of Operations</p>
            </div>
            <div className="cs-card">
              <div className="cs-metric">C-Suite</div>
              <span className="cs-metric-label">Transition Successfully Managed</span>
              <p className="cs-quote">"Stepping into the C-Suite was daunting. This coaching provided the framework I needed to navigate board dynamics effectively."</p>
              <p className="cs-author">Michael T., CFO</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section final-cta bg-surface text-center">
        <div className="container">
          <h2>Elevate your leadership narrative.</h2>
          <p>Schedule a confidential consultation to discuss your leadership challenges.</p>
          <div className="cta-group center">
            <Link to="/book-consultation" className="btn btn-primary">Book a conversation</Link>
            <Link to="/programmes" className="btn btn-secondary">Explore programmes</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LeadershipCoaching;
