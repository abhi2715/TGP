import { Link } from 'react-router-dom';
import { Clock, Calendar, Video, CheckCircle, ChevronDown, Star } from 'lucide-react';
import './ProgrammeDetail.css';

const ProgrammeDetail = () => {
  // In a real app, fetch data based on ID. Using placeholder data for the prototype.
  const programme = {
    title: "Executive Leadership Accelerator",
    subtitle: "Master the art of leading at scale and navigating complex organizational dynamics.",
    duration: "12 Weeks",
    format: "Hybrid (Live Online + 1 In-Person Retreat)",
    cohort: "Starting September 15, 2026",
    price: "$4,500",
    overview: "The Executive Leadership Accelerator is an intensive 12-week journey designed to transform high-performing managers into visionary, strategic executives. Moving beyond foundational management skills, this programme delves into the psychology of leadership, complex change management, and executive presence.",
    whoIsFor: [
      "Senior Managers transitioning to Director/VP roles",
      "Current Executives looking to refine their strategic approach",
      "Founders scaling their teams beyond 50 employees"
    ],
    curriculum: [
      { week: "Week 1-2", title: "The Psychology of Executive Presence", desc: "Understanding how you are perceived, developing authentic command, and mastering high-stakes communication." },
      { week: "Week 3-4", title: "Strategic Visioning & Alignment", desc: "Translating abstract vision into actionable strategy and aligning cross-functional teams." },
      { week: "Week 5-6", title: "Navigating Organizational Politics", desc: "Building influence without authority and managing complex stakeholder relationships ethically." },
      { week: "Week 7-8", title: "Leading Through Change & Crisis", desc: "Developing resilience, communicating effectively during uncertainty, and maintaining team morale." },
      { week: "Week 9-10", title: "Building High-Performance Cultures", desc: "Designing incentive structures, fostering psychological safety, and driving accountability." },
      { week: "Week 11-12", title: "The Capstone & Legacy", desc: "Synthesizing learnings into a personal leadership manifesto and 100-day execution plan." }
    ],
    faqs: [
      { q: "What is the weekly time commitment?", a: "Expect to dedicate 4-6 hours per week, including live sessions, reading materials, and application exercises." },
      { q: "Is the in-person retreat mandatory?", a: "While highly encouraged for networking and deep immersion, a virtual alternative is provided for those unable to travel." },
      { q: "Will I get 1-on-1 coaching?", a: "Yes, the programme includes three 60-minute private coaching sessions with our executive mentors." }
    ]
  };

  return (
    <div className="programme-detail-page">
      {/* Hero */}
      <section className="prog-detail-hero text-white">
        <div className="container">
          <div className="pd-hero-content">
            <span className="pd-tag">Executive Programme</span>
            <h1>{programme.title}</h1>
            <p className="pd-subtitle">{programme.subtitle}</p>
            
            <div className="pd-quick-facts">
              <div className="qf-item">
                <Clock size={20} />
                <div>
                  <span className="qf-label">Duration</span>
                  <span className="qf-value">{programme.duration}</span>
                </div>
              </div>
              <div className="qf-item">
                <Video size={20} />
                <div>
                  <span className="qf-label">Format</span>
                  <span className="qf-value">{programme.format}</span>
                </div>
              </div>
              <div className="qf-item">
                <Calendar size={20} />
                <div>
                  <span className="qf-label">Next Cohort</span>
                  <span className="qf-value">{programme.cohort}</span>
                </div>
              </div>
            </div>

            <div className="pd-hero-actions">
              <Link to="/contact" className="btn btn-accent">Apply Now</Link>
              <a href="#curriculum" className="btn btn-secondary text-white border-white">View Curriculum</a>
            </div>
          </div>
        </div>
      </section>

      {/* Overview & Who it's for */}
      <section className="section pd-overview">
        <div className="container pd-two-col">
          <div className="pd-main-col">
            <h2>Programme Overview</h2>
            <p className="lead-text">{programme.overview}</p>
            <p>
              Throughout this programme, you will engage in case studies from top-tier organizations, participate in peer masterminds, and receive direct feedback from ICF-certified executive coaches.
            </p>
          </div>
          <div className="pd-side-col bg-surface">
            <h3>Who This Is For</h3>
            <ul className="who-list">
              {programme.whoIsFor.map((item, idx) => (
                <li key={idx}><CheckCircle size={20} /> {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section id="curriculum" className="section pd-curriculum bg-surface">
        <div className="container">
          <div className="section-header text-center">
            <h2>The Curriculum</h2>
            <p>A rigorous, structured journey designed for maximum impact.</p>
          </div>
          
          <div className="curriculum-timeline">
            {programme.curriculum.map((module, idx) => (
              <div key={idx} className="curriculum-item">
                <div className="curr-week">{module.week}</div>
                <div className="curr-content">
                  <h3>{module.title}</h3>
                  <p>{module.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section pd-testimonial">
        <div className="container text-center">
          <div className="stars">
            <Star size={24} fill="var(--color-secondary)" color="var(--color-secondary)" />
            <Star size={24} fill="var(--color-secondary)" color="var(--color-secondary)" />
            <Star size={24} fill="var(--color-secondary)" color="var(--color-secondary)" />
            <Star size={24} fill="var(--color-secondary)" color="var(--color-secondary)" />
            <Star size={24} fill="var(--color-secondary)" color="var(--color-secondary)" />
          </div>
          <h2 className="testimonial-quote">"This wasn't just a course; it was a career-defining experience. The frameworks I learned here helped me navigate a major company merger seamlessly."</h2>
          <p className="testimonial-author">- David Chen, Director of Operations</p>
        </div>
      </section>

      {/* Pricing & FAQ */}
      <section className="section pd-pricing-faq">
        <div className="container pd-two-col">
          <div className="pd-pricing">
            <h2>Investment</h2>
            <div className="pricing-card">
              <div className="price">{programme.price}</div>
              <p className="price-desc">Comprehensive access to all live sessions, course materials, 1-on-1 coaching, and lifetime alumni network access.</p>
              <div className="cta-group">
                <Link to="/book-consultation" className="btn btn-primary">Book a conversation</Link>
              </div>
              <p className="finance-note">Payment plans and corporate sponsorship brochures available upon request.</p>
            </div>
          </div>
          
          <div className="pd-faq">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-list">
              {programme.faqs.map((faq, idx) => (
                <div key={idx} className="faq-item">
                  <div className="faq-question">
                    <h4>{faq.q}</h4>
                    <ChevronDown size={20} />
                  </div>
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgrammeDetail;
