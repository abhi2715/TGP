import { Link } from 'react-router-dom';
import { ArrowRight, Map, LineChart, Briefcase } from 'lucide-react';
import './Services.css';

const CareerGrowth = () => {
  return (
    <div className="service-page">
      <section className="service-hero">
        <div className="container">
          <span className="service-tag">Career Acceleration</span>
          <h1>Design a career of purpose and profit.</h1>
          <p className="hero-sub">
            Whether you are aiming for a promotion, a pivot, or entirely new horizons, we provide the strategic roadmap to get you there.
          </p>
          <Link to="/contact" className="btn btn-primary">Start Your Journey</Link>
        </div>
      </section>

      <section className="section benefits">
        <div className="container">
          <div className="section-header text-center">
            <h2>Your Competitive Advantage</h2>
          </div>
          <div className="service-benefits">
            <div className="benefit-card">
              <Map size={32} color="var(--color-secondary)" />
              <h3>Absolute Clarity</h3>
              <p>Eliminate confusion and define exactly what you want out of your career and how it aligns with your life goals.</p>
            </div>
            <div className="benefit-card">
              <Briefcase size={32} color="var(--color-secondary)" />
              <h3>Personal Branding</h3>
              <p>Learn how to position your unique value proposition so opportunities start coming to you.</p>
            </div>
            <div className="benefit-card">
              <LineChart size={32} color="var(--color-secondary)" />
              <h3>Accelerated Trajectory</h3>
              <p>Skip the trial-and-error. Use our proven frameworks to secure promotions and pivots faster.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section framework-section">
        <div className="container">
          <div className="section-header text-center">
            <h2>The Growth Roadmap</h2>
          </div>
          <div className="framework-grid">
            <div className="framework-step">
              <div className="step-num">01</div>
              <div className="step-content">
                <h3>The Discovery Assessment</h3>
                <p>Uncovering your intrinsic motivators, core competencies, and market differentiators.</p>
              </div>
            </div>
            <div className="framework-step">
              <div className="step-num">02</div>
              <div className="step-content">
                <h3>Market Positioning</h3>
                <p>Refining your resume, LinkedIn profile, and professional narrative to attract premium opportunities.</p>
              </div>
            </div>
            <div className="framework-step">
              <div className="step-num">03</div>
              <div className="step-content">
                <h3>Network Activation</h3>
                <p>Strategies for building genuine relationships with decision-makers and industry influencers.</p>
              </div>
            </div>
            <div className="framework-step">
              <div className="step-num">04</div>
              <div className="step-content">
                <h3>Negotiation & Closing</h3>
                <p>Mastering the art of interviewing and negotiating compensation packages that reflect your true worth.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section case-studies">
        <div className="container">
          <div className="section-header text-center">
            <h2>Success Stories</h2>
          </div>
          <div className="cs-grid">
            <div className="cs-card">
              <div className="cs-metric">180°</div>
              <span className="cs-metric-label">Industry Pivot</span>
              <p className="cs-quote">"I successfully transitioned from finance to a tech product role without taking a pay cut. The positioning strategies were game-changing."</p>
              <p className="cs-author">Alex K., Product Manager</p>
            </div>
            <div className="cs-card">
              <div className="cs-metric">$45k</div>
              <span className="cs-metric-label">Salary Increase</span>
              <p className="cs-quote">"The negotiation frameworks gave me the confidence to ask for—and get—what I was actually worth in the market."</p>
              <p className="cs-author">Priya S., Marketing Director</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section final-cta bg-surface text-center">
        <div className="container">
          <h2>Stop leaving your career to chance.</h2>
          <p>Take control of your professional trajectory today.</p>
          <Link to="/programmes" className="btn btn-primary">Explore Programmes <ArrowRight size={18}/></Link>
        </div>
      </section>
    </div>
  );
};

export default CareerGrowth;
