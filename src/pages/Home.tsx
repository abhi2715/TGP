import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Mail, Target, Rocket, Brain, Handshake, Sprout, Award, Leaf, Users, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import MagneticButton from '../components/ui/MagneticButton';
import ScrollReveal from '../components/ui/ScrollReveal';
import './Home.css';



const Home = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;
    setMousePos({ x, y });
  };

  return (
    <div className="home-page">
      {/* ══════════════════════════════════
          HERO — Full viewport, cinematic
         ══════════════════════════════════ */}
      <section className="hero-section" onMouseMove={handleMouseMove}>
        <div className="hero-bg-layer" />
        <div className="hero-particles" />
        <div className="container hero-container">
          <div className="hero-content">
            <motion.div
              initial={{ opacity: 0, y: 40, rotateX: 10 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{ perspective: '1200px' }}
            >
              <span className="hero-tag">The Growth Project</span>
              <h1 className="display-title">
                Coaching Professionals<br />
                <span className="text-gold">For Excellence</span>
              </h1>
            </motion.div>

            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              With over two decades of leading and transforming global businesses in banking and technology, I bring deep insights into navigating complex professional landscapes with confidence and purpose.
            </motion.p>

            <motion.div
              className="hero-ctas"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <MagneticButton>
                <Link to="/programmes" className="btn btn-dark">
                  Discover Shikhar <ArrowRight size={18} />
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link to="/contact" className="btn btn-secondary" style={{ padding: '0.9rem 3rem' }}>
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
          >

            <div className="hero-photo-frame">
              <img src="/pooja_sharma_updated.jpg" alt="Dr. Pooja Sharma" className="hero-photo" />
            </div>
            
            <motion.div 
              className="hero-leaves-overlay"
              initial={{ x: "-50%", y: "-50%" }}
              animate={{ 
                x: `calc(-50% + ${mousePos.x * 20}px)`, 
                y: `calc(-50% + ${mousePos.y * 20}px)`
              }}
              transition={{ type: "spring", stiffness: 40, damping: 30 }}
            >
              <img src="/leaves.png" alt="" className="hero-leaves-img" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════
          FEATURES BAND
         ══════════════════════════════════ */}
      <hr className="section-separator" />
      <section className="features-band">
        <div className="container features-container">
          <div className="feature-item">
            <div className="feature-icon-wrapper">
              <Award className="feature-icon" strokeWidth={1.5} />
            </div>
            <p>20+ Years<br/>of Global Leadership<br/>Experience</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon-wrapper">
              <Leaf className="feature-icon" strokeWidth={1.5} />
            </div>
            <p>Transformative<br/>Coaching for<br/>Lasting Impact</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon-wrapper">
              <Users className="feature-icon" strokeWidth={1.5} />
            </div>
            <p>Empowering<br/>Professionals to<br/>Lead with Confidence</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon-wrapper">
              <Star className="feature-icon" strokeWidth={1.5} />
            </div>
            <p>Purpose-Driven<br/>Growth &<br/>Measurable Results</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          ENHANCED MARQUEE BANNER
         ══════════════════════════════════ */}
      <div className="marquee-section">
        <div className="marquee-glass-banner">
          <div className="marquee-wrapper">
              <div className="marquee">
                <div className="marquee-content">
                  <span>✦ ICF Certified Coach (ACC)</span>
                  <span>✦ IIM Bangalore Alumna</span>
                  <span>✦ 25+ Years Leadership Experience</span>
                  <span>✦ Doctoral Researcher</span>
                  <span>✦ Industry Leader Banking & Financial Markets</span>
                  <span>✦ Built & Led Multi-Million-Dollar Businesses</span>
                </div>
                <div className="marquee-content" aria-hidden="true">
                  <span>✦ ICF Certified Coach (ACC)</span>
                  <span>✦ IIM Bangalore Alumna</span>
                  <span>✦ 25+ Years Leadership Experience</span>
                  <span>✦ Doctoral Researcher</span>
                  <span>✦ Industry Leader Banking & Financial Markets</span>
                  <span>✦ Built & Led Multi-Million-Dollar Businesses</span>
                </div>
              </div>
            </div>
          </div>
      </div>

      {/* ══════════════════════════════════
          ABOUT PREVIEW — EXACT DESIGN
         ══════════════════════════════════ */}
      <hr className="section-separator" />
      <section className="about-preview-exact">
        <div className="about-bg-elements">
          <div className="about-dots-right"></div>
          <div className="about-waves-bottom"></div>
        </div>

        <div className="container" style={{ maxWidth: '800px', position: 'relative', zIndex: 2 }}>
          <ScrollReveal direction="up" delay={0.1}>
            <div className="about-header-exact">
              <div className="about-divider-top">
                <div className="line"></div>
                <Leaf size={20} className="icon-gold" strokeWidth={1.5} />
                <div className="line"></div>
              </div>
              
              <h2>
                Empowering Your<br />
                <span className="text-gold">Leadership Journey</span>
              </h2>

              <div className="about-divider-bottom">
                <div className="line"></div>
                <div className="diamond">◇</div>
                <div className="line"></div>
              </div>
            </div>
          </ScrollReveal>

          <div style={{ textAlign: 'center' }}>
            <ScrollReveal direction="up" delay={0.2}>
              <p className="lead-text-exact">
                My passion lies in empowering professionals to step into leadership<br className="desktop-break" />
                with clarity and confidence. Having built and led global multi-<br className="desktop-break" />
                million-dollar businesses, I understand the challenges professionals face in<br className="desktop-break" />
                navigating the corporate landscape.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <p className="lead-text-exact">
                Through my coaching, I help professionals discover their unique voice,<br className="desktop-break" />
                sharpen their leadership presence, and chart pathways for sustainable<br className="desktop-break" />
                success. Together, we create a space where aspirations turn into action and<br className="desktop-break" />
                potential transforms into impact.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="up" delay={0.4}>
            <div className="about-cta-wrapper">
              <Link to="/about" className="btn-read-story">
                Read My Story <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════
          FIVE PILLARS — EXACT DESIGN
         ══════════════════════════════════ */}
      <hr className="section-separator" />
      <section className="pillars-section-exact paripakv-bg-wrap">
        <div className="paripakv-bg" style={{ backgroundImage: "url('/services-bg.png')", opacity: 0.15 }}></div>
        <div className="pillars-bg-exact">
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal direction="up">
            <div className="about-header-exact">
              <div className="about-divider-top">
                <div className="line"></div>
                <Leaf size={20} className="icon-gold" strokeWidth={1.5} />
                <div className="line"></div>
              </div>
              
              <h2>
                The <span className="text-gold">Five Pillars</span> of Growth
              </h2>

              <div className="about-divider-bottom">
                <div className="line"></div>
                <div className="diamond">◇</div>
                <div className="line"></div>
              </div>
              
              <p className="pillars-subtitle">
                A holistic approach to comprehensive development<br/>
                across your professional and personal life.
              </p>
            </div>
          </ScrollReveal>

          <div className="pillars-grid-exact">
            {[
              { icon: <Target size={36} strokeWidth={1.5} />, title: 'Leadership', desc: 'Command the room, inspire teams, and drive strategic vision.' },
              { icon: <Rocket size={36} strokeWidth={1.5} />, title: 'Career', desc: 'Accelerate your trajectory and unlock new opportunities.' },
              { icon: <Brain size={36} strokeWidth={1.5} />, title: 'Mindset', desc: 'Cultivate resilience, clarity, and unstoppable confidence.' },
              { icon: <Handshake size={36} strokeWidth={1.5} />, title: 'Mentorship', desc: 'Learn from industry veterans who have walked the path.' },
              { icon: <Sprout size={36} strokeWidth={1.5} />, title: 'Personal\nGrowth', desc: 'Align your purpose with your daily actions and habits.' },
            ].map((pillar, idx) => (
              <ScrollReveal key={idx} direction="up" delay={0.1 + (idx * 0.1)}>
                <div className="pillar-card-exact">
                  <div className="pillar-icon-exact">{pillar.icon}</div>
                  <h3>{pillar.title.includes('\n') ? pillar.title.split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br/>}</span>) : pillar.title}</h3>
                  <p>{pillar.desc}</p>
                  <div className="pillar-card-divider">
                    <div className="line"></div>
                    <Leaf size={14} className="icon-gold" strokeWidth={1.5} />
                    <div className="line"></div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          MENTOR — Pooja's Story
         ══════════════════════════════════ */}
      <hr className="section-separator" />
      <section className="mentor-section-exact paripakv-bg-wrap">
        <div className="paripakv-bg" style={{ backgroundImage: "url('/section-light.png')", opacity: 0.3 }}></div>
        <div className="container mentor-container-exact">
          <ScrollReveal direction="up" duration={0.9}>
            <div className="mentor-image-exact">
              <img src="/pooja_sharma_updated.jpg" alt="Dr. Pooja Sharma" />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" duration={0.9} delay={0.2}>
            <div className="mentor-content-exact">
              <div className="mentor-label-exact">THE GROWTH PROJECT</div>
              
              <div className="about-divider-top" style={{ justifyContent: 'flex-start', marginBottom: '1.25rem', marginTop: '0.5rem' }}>
                <div className="line" style={{ width: '30px' }}></div>
                <Leaf size={16} className="icon-gold" strokeWidth={1.5} />
                <div className="line" style={{ width: '30px' }}></div>
              </div>

              <h2>Dr. Pooja Sharma</h2>
              <h4 className="mentor-role-exact">Industry Leader • Banking & Financial Markets</h4>
              
              <p className="mentor-bio-exact">
                Hi, I'm Pooja Sharma — a certified workplace coach and business leader with over two decades of experience driving transformation across global banking and technology organizations. My journey has spanned building high-performing teams, leading large-scale businesses, and pioneering innovation at the intersection of people, strategy, and technology.
              </p>
              <p className="mentor-bio-exact">
                As a doctoral researcher and IIM Bangalore alumna, I've explored how AI and the future of work are reshaping leadership. My passion lies in coaching professionals and leaders to find clarity, confidence, and purpose in their growth journeys.
              </p>

              <ul className="mentor-creds-exact">
                <li>
                  <div className="cred-icon"><CheckCircle size={20} strokeWidth={1.5} /></div>
                  Specializing in Sustainable Innovation-led Growth
                </li>
                <li>
                  <div className="cred-icon"><CheckCircle size={20} strokeWidth={1.5} /></div>
                  ICF Certified Coach (ACC Credential)
                </li>
                <li>
                  <div className="cred-icon"><CheckCircle size={20} strokeWidth={1.5} /></div>
                  IIM Bangalore Alumna
                </li>
              </ul>

              <div className="mentor-socials-exact">
                <MagneticButton>
                  <a href="mailto:contact.thegrowthproject@gmail.com" className="btn-mentor-primary">
                    <Mail size={18} strokeWidth={1.5} /> Get in touch
                  </a>
                </MagneticButton>
                <MagneticButton>
                  <a href="https://www.linkedin.com/in/poojasharma72" target="_blank" rel="noopener noreferrer" className="btn-mentor-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg> LinkedIn
                  </a>
                </MagneticButton>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════
          FINAL CTA
         ══════════════════════════════════ */}
      <hr className="section-separator" />
      <section className="section final-cta">
        <div className="final-cta-bg" />
        <div className="container text-center" style={{ position: 'relative', zIndex: 1 }}>
          <ScrollReveal direction="3d-up">
            <h2 style={{ color: 'var(--color-bg)', marginBottom: '1rem' }}>Ready to accelerate your growth?</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '560px', margin: '0 auto 2.5rem' }}>
              Join hundreds of professionals who have transformed their leadership and careers.
            </p>
            <div className="cta-buttons">
              <MagneticButton>
                <Link to="/book-consultation" className="btn btn-primary">Book a conversation</Link>
              </MagneticButton>
              <MagneticButton>
                <Link to="/programmes" className="btn btn-accent">Explore Programmes</Link>
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Home;
