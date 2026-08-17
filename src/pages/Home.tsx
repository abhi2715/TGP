import { Link } from 'react-router-dom';
import { ArrowRight, Target, Rocket, Brain, Handshake, Sprout, GraduationCap, Award, Clock, Users, Microscope } from 'lucide-react';
import { motion } from 'framer-motion';
import MagneticButton from '../components/ui/MagneticButton';
import ScrollReveal from '../components/ui/ScrollReveal';
import './Home.css';


const Home = () => {

  return (
    <div className="home-page">
      {/* ══════════════════════════════════
          HERO — Off-white, bold, simple
         ══════════════════════════════════ */}
      <section className="hero-section" id="home">
        <div className="container hero-container">
          <div className="hero-content">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="display-title">
                Leadership coaching <span className="gold-gradient-text">for</span><br />
                <span className="gold-gradient-text">professionals</span>
              </h1>
            </motion.div>

            <motion.div
              className="hero-subtitle"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ textAlign: 'left', fontSize: '0.95rem', lineHeight: '1.6' }}
            >
              <div style={{ marginBottom: '1.5rem' }}>
                <strong style={{ color: 'var(--color-dark-green)', display: 'block', marginBottom: '0.5rem', fontSize: '1.05rem' }}>Leadership is Being Rewritten:</strong>
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <li><span style={{color:'var(--color-gold)', marginRight: '8px'}}>✦</span> The world has changed more in the last 5 years than the previous 20.</li>
                  <li><span style={{color:'var(--color-gold)', marginRight: '8px'}}>✦</span> Artificial Intelligence is transforming industries exponentially.</li>
                  <li><span style={{color:'var(--color-gold)', marginRight: '8px'}}>✦</span> Business models are reinvented and decision cycles are shrinking.</li>
                </ul>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <strong style={{ color: 'var(--color-dark-green)', display: 'block', marginBottom: '0.5rem', fontSize: '1.05rem' }}>Beyond VUCA — The Speed of Disruption:</strong>
                <p style={{ margin: '0 0 0.5rem 0' }}>Leaders now operate where disruption compounds faster than organisations can adapt:</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
                  <div><span style={{color:'var(--color-gold)', marginRight: '6px'}}>•</span> AI & Tech Change</div>
                  <div><span style={{color:'var(--color-gold)', marginRight: '6px'}}>•</span> Hybrid Workplaces</div>
                  <div><span style={{color:'var(--color-gold)', marginRight: '6px'}}>•</span> Geopolitical Shifts</div>
                  <div><span style={{color:'var(--color-gold)', marginRight: '6px'}}>•</span> Generational Shifts</div>
                  <div style={{ gridColumn: 'span 2' }}><span style={{color:'var(--color-gold)', marginRight: '6px'}}>•</span> Increasing Stakeholder Expectations</div>
                </div>
              </div>

              <div>
                <strong style={{ color: 'var(--color-dark-green)', display: 'block', marginBottom: '0.5rem', fontSize: '1.05rem' }}>Shape the Change:</strong>
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <li><span style={{color:'var(--color-gold)', marginRight: '8px'}}>✦</span> Tomorrow’s leaders won't just keep pace—they will grow faster than change itself.</li>
                  <li><span style={{color:'var(--color-gold)', marginRight: '8px'}}>✦</span> Our programmes prepare you not merely to respond to change, but to shape it.</li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              className="hero-ctas"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <MagneticButton>
                <Link to="/programmes" className="btn btn-dark">
                  Explore Programmes <ArrowRight size={18} />
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link to="/contact" className="btn btn-secondary">
                  Get in Touch
                </Link>
              </MagneticButton>
            </motion.div>
          </div>

          <motion.div
            className="hero-photo-wrapper"
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center'
            }}
          >
            <img 
              src="/leadership_books_compass.png" 
              alt="Leadership and Strategic Direction" 
              className="hero-image-sculpture" 
              style={{ 
                objectFit: 'contain', 
                width: '100%', 
                maxWidth: '500px',
                zIndex: 2,
                position: 'relative'
              }}
            />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.a
          href="#about"
          className="hero-scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12l7 7 7-7" stroke="var(--color-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.a>
      </section>

      {/* ── Credentials Strip — Dark Green ── */}
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

      {/* ══════════════════════════════════
          ABOUT PREVIEW
         ══════════════════════════════════ */}
      <section className="about-preview" id="about">
        <div className="container about-preview-container">
          
          <div className="about-image-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ScrollReveal direction="up" delay={0.1}>
              <img 
                src="/leadership_compass.png" 
                alt="Leadership and Growth Compass" 
                style={{ 
                  objectFit: 'contain', 
                  width: '100%', 
                  maxWidth: '550px',
                  height: 'auto', 
                  position: 'relative',
                  zIndex: 2,
                  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.08))'
                }}
              />
            </ScrollReveal>
          </div>

          <div className="about-content">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="section-title-wrap" style={{ textAlign: 'left', marginBottom: '2rem' }}>
                <div className="about-divider-top" style={{ margin: '0 0 1rem 0', justifyContent: 'flex-start' }}>
                  <div className="line"></div>
                  <span className="icon-gold">◆</span>
                  <div className="line"></div>
                </div>
                <h2>
                  Accelerate Your<br />
                  <span className="text-gold">Leadership Journey</span>
                </h2>
              </div>
            </ScrollReveal>

            <div style={{ textAlign: 'left' }}>
              <ScrollReveal direction="up" delay={0.2}>
                <h4 style={{ color: 'var(--color-dark-green)', marginBottom: '1rem', fontWeight: 600 }}>Enabling your Leadership Journey</h4>
                <p className="lead-text" style={{ marginBottom: '1.5rem', fontWeight: 500 }}>
                  Leadership today demands more than experience. It demands the ability to continually evolve.
                </p>
                <p className="lead-text" style={{ marginBottom: '1.5rem' }}>
                  Hi, I'm Pooja Sharma — Over the past 25 years, I have led businesses, built high-performing teams, and driven large-scale transformation across global banking and technology organizations. From scaling multi-million-dollar businesses to navigating digital disruption and Artificial Intelligence, my career has been shaped by one constant—the ability to grow through change.
                </p>
                <p className="lead-text" style={{ marginBottom: '1.5rem' }}>
                  As an ICF Certified Leadership Coach, an alumna of IIM Bangalore, and a doctoral researcher on Artificial Intelligence and the Future of Work, I bring together the perspectives of a business leader, technologist, and coach. My work is grounded not only in leadership theory but in decades of real-world executive experience.
                </p>
                <p className="lead-text" style={{ marginBottom: '1.5rem' }}>
                  I founded The Growth Project with a simple belief: leadership is no longer about keeping pace with change—it is about growing faster than change itself.
                </p>
                <p className="lead-text" style={{ marginBottom: '1.5rem' }}>
                  Through executive and leadership coaching, I help professionals:
                </p>
                <ul style={{ listStyleType: 'none', padding: 0, margin: '0 0 2rem 0' }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <span style={{ color: 'var(--color-gold)', marginRight: '10px' }}>✦</span>
                    <span style={{ color: 'var(--color-text)' }}>Unlock their potential and strengthen leadership presence</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <span style={{ color: 'var(--color-gold)', marginRight: '10px' }}>✦</span>
                    <span style={{ color: 'var(--color-text)' }}>Build habits that create exponential growth</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <span style={{ color: 'var(--color-gold)', marginRight: '10px' }}>✦</span>
                    <span style={{ color: 'var(--color-text)' }}>Lead with confidence in an AI-enabled world</span>
                  </li>
                </ul>
                <p className="lead-text" style={{ marginBottom: '2rem', fontStyle: 'italic', fontWeight: 500 }}>
                  My coaching combines deep reflection with practical action, enabling leaders to navigate complexity, influence with authenticity, and create lasting impact.<br/><br/>
                  Because leadership isn't defined by the position you hold.<br/>
                  <strong style={{ color: 'var(--color-dark-green)' }}>It's defined by the person you become.</strong>
                </p>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="up" delay={0.4}>
              <div className="about-cta-wrapper" style={{ marginTop: '1rem' }}>
                <Link to="/programmes" className="btn btn-dark">
                  Explore Programmes <ArrowRight size={16} />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          FIVE PILLARS — Dark Green
         ══════════════════════════════════ */}
      <section className="pillars-section" id="pillars">
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal direction="up">
            <div className="section-title-wrap">
              <div className="about-divider-top">
                <div className="line" style={{ backgroundColor: 'var(--color-gold)' }}></div>
                <span style={{ color: 'var(--color-gold)' }}>◆</span>
                <div className="line" style={{ backgroundColor: 'var(--color-gold)' }}></div>
              </div>
              <h2>
                The <span className="text-gold">Five Pillars</span> of Growth
              </h2>
              <p className="pillars-subtitle">
                A holistic approach to comprehensive development<br/>
                across your professional and personal life.
              </p>
            </div>
          </ScrollReveal>

          <div className="pillars-grid">
            {[
              { icon: <Target size={36} strokeWidth={1.5} />, title: 'Leadership', desc: 'Command the room, inspire teams, and drive strategic vision.' },
              { icon: <Rocket size={36} strokeWidth={1.5} />, title: 'Career', desc: 'Accelerate your trajectory and unlock new opportunities.' },
              { icon: <Brain size={36} strokeWidth={1.5} />, title: 'Mindset', desc: 'Cultivate resilience, clarity, and unstoppable confidence.' },
              { icon: <Handshake size={36} strokeWidth={1.5} />, title: 'Mentorship', desc: 'Learn from industry veterans who have walked the path.' },
              { icon: <Sprout size={36} strokeWidth={1.5} />, title: 'Personal\nGrowth', desc: 'Align your purpose with your daily actions and habits.' },
            ].map((pillar, idx) => (
              <ScrollReveal key={idx} direction="up" delay={0.1 + (idx * 0.1)}>
                <div className="pillar-card">
                  <div className="pillar-icon">{pillar.icon}</div>
                  <h3>{pillar.title.includes('\n') ? pillar.title.split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br/>}</span>) : pillar.title}</h3>
                  <p>{pillar.desc}</p>
                  <div className="pillar-divider">
                    <div className="pillar-divider-line" />
                    <div className="pillar-divider-dot" />
                    <div className="pillar-divider-line" />
                  </div>
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

export default Home;
