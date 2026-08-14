import { Link } from 'react-router-dom';
import { Award, Microscope, Mountain, Sprout, Heart, Users, GraduationCap, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ui/ScrollReveal';
import MagneticButton from '../components/ui/MagneticButton';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* ── Hero ── */}
      <section className="about-hero">
        <div className="container about-hero-container">
          <motion.div 
            className="about-image-wrap"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src="/pooja_sharma_updated.jpg" alt="Dr. Pooja Sharma" />
          </motion.div>

          <div className="about-hero-content">
            <ScrollReveal direction="up" delay={0.2}>
              <div className="about-label">MY STORY</div>
              <h2>
                Hi, I'm <span className="text-gold">Pooja Sharma</span>
              </h2>

              <div className="about-divider-top" style={{ marginBottom: '1.5rem' }}>
                <div className="line"></div>
                <span className="icon-gold">◆</span>
                <div className="line"></div>
              </div>
              
              <p className="lead-text" style={{ marginBottom: '1.25rem' }}>
                Over the past 25 years, I have led businesses, built high-performing teams, and driven large-scale transformation across global banking and technology organizations. From scaling multi-million-dollar businesses to navigating digital disruption and Artificial Intelligence, my career has been shaped by one constant—the ability to grow through change.
              </p>
              
              <p className="lead-text" style={{ marginBottom: '2rem' }}>
                As an ICF Certified Leadership Coach, an alumna of IIM Bangalore, and a doctoral researcher on Artificial Intelligence and the Future of Work, I bring together the perspectives of a business leader, technologist and coach. My work is grounded not only in leadership theory but in decades of real-world executive experience.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>



      {/* ── Personal Story ── */}
      <hr className="section-separator" />
      <section className="section about-timeline-section">
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="timeline-container">
            <div className="timeline-line"></div>
            <div className="timeline-line-glow"></div>
            
            <ScrollReveal direction="up" delay={0.1}>
              <div className="timeline-item">
                <div className="timeline-marker">
                  <div className="timeline-marker-inner">
                    <Mountain size={24} className="text-gold" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="timeline-card premium-glass">
                  <div className="timeline-card-content">
                    <div className="step-number">01</div>
                    <h2>Where It All Began</h2>
                    <div className="title-underline" style={{ margin: '1rem 0 1.5rem' }} />
                    <p>
                      My career began in the world of banking and finance — building teams, launching products, and leading multi-million-dollar businesses across global markets. For over two decades, I navigated the complex landscapes of corporate leadership, learning firsthand what it takes to succeed at the highest levels.
                    </p>
                    <p>
                      But along the way, I noticed something: brilliant professionals were stalling in their careers. Not because they lacked talent or competence, but because they lacked the right guidance, the right frameworks, and someone who truly understood their journey.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="timeline-item">
                <div className="timeline-marker">
                  <div className="timeline-marker-inner">
                    <Sprout size={24} className="text-gold" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="timeline-card premium-glass">
                  <div className="timeline-card-content">
                    <div className="step-number">02</div>
                    <h2>Why I Started The Growth Project</h2>
                    <div className="title-underline" style={{ margin: '1rem 0 1.5rem' }} />
                    <p>
                      The Growth Project was born from a simple belief: <strong>everyone deserves access to the kind of mentorship that changes lives.</strong> I wanted to create a space where ambitious professionals and learners stepping into leadership could find clarity, build confidence, and chart their own path to impact.
                    </p>
                    <p>
                      As an IIM Bangalore alumna and ICF-certified coach (ACC credential), I bring both the rigour of strategic thinking and the warmth of genuine human connection to every coaching engagement. My doctoral research into AI and the future of work has also shaped my unique perspective on how leadership must evolve.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <div className="timeline-item">
                <div className="timeline-marker">
                  <div className="timeline-marker-inner">
                    <Heart size={24} className="text-gold" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="timeline-card premium-glass">
                  <div className="timeline-card-content">
                    <div className="step-number">03</div>
                    <h2>What I Believe</h2>
                    <div className="title-underline" style={{ margin: '1rem 0 1.5rem' }} />
                    <p>
                      I believe that true leadership starts with self-awareness. That growth is not a destination but a daily practice. And that every individual who finds their voice makes the world a little brighter.
                    </p>
                    <p>
                      Through structured coaching, deep reflection, and real-world frameworks, I help my clients unlock the leader within — whether they're navigating their first managerial role or stepping onto the global stage.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ── Credentials Strip — Dark Green ── */}
      <hr className="section-separator" />
      <section className="about-credentials">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <ScrollReveal direction="3d-up">
            <div className="creds-grid">
              {[
                { icon: <GraduationCap className="text-gold" size={32} />, title: 'IIM Bangalore', sub: 'MBA · Finance & International Business' },
                { icon: <Award className="text-gold" size={32} />, title: 'ICF Certified', sub: 'Associate Certified Coach (ACC)' },
                { icon: <Clock className="text-gold" size={32} />, title: '500+ Hours', sub: 'Professional Teaching & Coaching' },
                { icon: <Users className="text-gold" size={32} />, title: '50+ Professionals', sub: 'Transformed' },
                { icon: <Microscope className="text-gold" size={32} />, title: 'Doctoral Researcher', sub: 'AI & The Future of Work' },
              ].map((cred, i) => (
                <motion.div
                  key={i}
                  className="cred-card"
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className="cred-icon">{cred.icon}</div>
                  <h4>{cred.title}</h4>
                  <p>{cred.sub}</p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>



      {/* ── Approach ── */}
      <hr className="section-separator" />
      <section className="section about-approach-section">
        <div className="container about-approach-container">
          <ScrollReveal direction="up">
            <div className="section-header text-center">
              <h2>My Coaching Approach</h2>
              <div className="title-underline" />
              <p>Simple, warm, and rooted in real-world experience.</p>
            </div>
          </ScrollReveal>

          <div className="approach-steps">
            {[
              { num: '01', title: 'Listen & Understand', desc: "We start with a deep conversation about where you are, what's holding you back, and where you want to go." },
              { num: '02', title: 'Reflect & Reframe', desc: 'Together, we challenge old narratives, uncover blind spots, and reframe your relationship with success.' },
              { num: '03', title: 'Act & Grow', desc: 'With clear frameworks and ongoing support, you take deliberate steps toward your goals — and watch real transformation happen.' },
            ].map((step, i) => (
              <ScrollReveal key={i} direction="3d-up" delay={i * 0.15}>
                <div className="approach-step glass-card">
                  <div className="approach-num">{step.num}</div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          FINAL CTA — Gold background
         ══════════════════════════════════ */}
      <section className="section final-cta" id="cta">
        <div className="container text-center" style={{ position: 'relative', zIndex: 1 }}>
          <ScrollReveal direction="3d-up">
            <h2>Ready to accelerate your Leadership journey?</h2>
            <p>
              Join hundreds of professionals who have transformed their Professional journey.
            </p>
            <div className="cta-buttons">
              <MagneticButton>
                <Link to="/book-consultation" className="btn btn-primary">Book a conversation</Link>
              </MagneticButton>
              <MagneticButton>
                <Link to="/programmes" className="btn" style={{ background: 'transparent', color: 'var(--color-gold)', border: '1px solid rgba(200, 151, 62, 0.4)' }}>Explore Programmes</Link>
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default About;
