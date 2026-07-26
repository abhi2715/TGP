import { Link } from 'react-router-dom';
import { ArrowRight, Mail, GraduationCap, Award, BarChart, Microscope, CheckCircle, Leaf, Mountain, Sprout, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ui/ScrollReveal';
import MagneticButton from '../components/ui/MagneticButton';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* ── Hero ── */}
      <section className="about-hero-exact">
        <div className="about-bg-elements">
          <div className="about-waves-bottom"></div>
        </div>

        <div className="container about-container-exact" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal direction="up" delay={0.1}>
            <div className="about-image-exact">
              <img src="/pooja_sharma_updated.jpg" alt="Dr. Pooja Sharma" />
            </div>
          </ScrollReveal>

          <div className="about-content-exact">
            <ScrollReveal direction="up" delay={0.2}>
              <div className="about-label-exact">MY STORY</div>
              <h2>
                Hi, I'm <span className="text-gold-italic">Pooja.</span>
              </h2>

              <div className="about-divider-top" style={{ justifyContent: 'flex-start', marginBottom: '1.5rem' }}>
                <div className="line"></div>
                <Leaf size={16} className="icon-gold" strokeWidth={1.5} />
                <div className="line"></div>
              </div>
              
              <p className="lead-text-exact text-left">
                A certified workplace coach, business leader, and passionate advocate for professionals in leadership — with over 25 years of experience transforming global banking and technology organizations.
              </p>
              
              <p className="lead-text-exact text-left">
                As a doctoral researcher and IIM Bangalore alumna, I've explored how AI and the future of work are reshaping leadership. My passion lies in coaching professionals and leaders to find clarity, confidence, and purpose in their growth journeys.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <div className="about-creds-horizontal">
                <div className="cred-item">
                  <div className="cred-icon"><CheckCircle size={20} strokeWidth={1.5} /></div>
                  <p>Specializing in<br/>Sustainable Innovation-<br/>led Growth</p>
                </div>
                <div className="cred-divider"></div>
                <div className="cred-item">
                  <div className="cred-icon"><CheckCircle size={20} strokeWidth={1.5} /></div>
                  <p>ICF Certified Coach<br/>(ACC Credential)</p>
                </div>
                <div className="cred-divider"></div>
                <div className="cred-item">
                  <div className="cred-icon"><CheckCircle size={20} strokeWidth={1.5} /></div>
                  <p>IIM Bangalore<br/>Alumna</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Personal Story ── */}
      <hr className="section-separator" />
      <section className="section about-timeline-section">
        <div className="about-timeline-leaves">
          <img src="/golden-leaves.png" alt="" />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="timeline-container">
            <div className="timeline-line"></div>
            
            <ScrollReveal direction="up" delay={0.1}>
              <div className="timeline-item">
                <div className="timeline-marker">
                  <Mountain size={28} className="text-gold" strokeWidth={1.5} />
                </div>
                <div className="timeline-card glass-card-light">
                  <h2>Where It All Began</h2>
                  <div className="title-underline" style={{ margin: '1rem 0 2rem' }} />
                  <p>
                    My career began in the world of banking and finance — building teams, launching products, and leading multi-million-dollar businesses across global markets. For over two decades, I navigated the complex landscapes of corporate leadership, learning firsthand what it takes to succeed at the highest levels.
                  </p>
                  <p>
                    But along the way, I noticed something: brilliant professionals were stalling in their careers. Not because they lacked talent or competence, but because they lacked the right guidance, the right frameworks, and someone who truly understood their journey.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="timeline-item">
                <div className="timeline-marker">
                  <Sprout size={28} className="text-gold" strokeWidth={1.5} />
                </div>
                <div className="timeline-card glass-card-light">
                  <h2>Why I Started The Growth Project</h2>
                  <div className="title-underline" style={{ margin: '1rem 0 2rem' }} />
                  <p>
                    The Growth Project was born from a simple belief: <strong>everyone deserves access to the kind of mentorship that changes lives.</strong> I wanted to create a space where ambitious professionals and learners stepping into leadership could find clarity, build confidence, and chart their own path to impact.
                  </p>
                  <p>
                    As an IIM Bangalore alumna and ICF-certified coach (ACC credential), I bring both the rigour of strategic thinking and the warmth of genuine human connection to every coaching engagement. My doctoral research into AI and the future of work has also shaped my unique perspective on how leadership must evolve.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <div className="timeline-item">
                <div className="timeline-marker">
                  <Heart size={28} className="text-gold" strokeWidth={1.5} />
                </div>
                <div className="timeline-card glass-card-light">
                  <h2>What I Believe</h2>
                  <div className="title-underline" style={{ margin: '1rem 0 2rem' }} />
                  <p>
                    I believe that true leadership starts with self-awareness. That growth is not a destination but a daily practice. And that every individual who finds their voice makes the world a little brighter.
                  </p>
                  <p>
                    Through structured coaching, deep reflection, and real-world frameworks, I help my clients unlock the leader within — whether they're navigating their first managerial role or stepping onto the global stage.
                  </p>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ── Credentials Strip ── */}
      <hr className="section-separator" />
      <section className="about-credentials paripakv-bg-wrap">
        <div className="about-credentials-bg" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <ScrollReveal direction="3d-up">
            <div className="creds-grid">
              {[
                { icon: <GraduationCap className="text-gold" size={32} />, title: 'IIM Bangalore', sub: 'MBA · Finance & International Business' },
                { icon: <Award className="text-gold" size={32} />, title: 'ICF Certified', sub: 'Associate Certified Coach (ACC)' },
                { icon: <BarChart className="text-gold" size={32} />, title: '25+ Years', sub: 'Banking & Technology Leadership' },
                { icon: <Microscope className="text-gold" size={32} />, title: 'Doctoral Researcher', sub: 'AI & The Future of Work' },
              ].map((cred, i) => (
                <motion.div
                  key={i}
                  className="cred-card glass-card-dark"
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

      {/* ── CTA ── */}
      <hr className="section-separator" />
      <section className="section about-cta-section text-center">
        <div className="container text-center">
          <ScrollReveal direction="up">
            <h2>Let's work together.</h2>
            <p style={{ maxWidth: '560px', margin: '0 auto 2rem' }}>
              Whether you're looking to step into leadership, navigate a career transition, or simply find clarity — I'd love to hear from you.
            </p>
            <div className="cta-buttons">
              <MagneticButton>
                <Link to="/book-consultation" className="btn btn-primary">Book a conversation <ArrowRight size={16} /></Link>
              </MagneticButton>
              <MagneticButton>
                <a href="mailto:contact.thegrowthproject@gmail.com" className="btn btn-secondary">
                  <Mail size={16} /> Get in touch
                </a>
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default About;
