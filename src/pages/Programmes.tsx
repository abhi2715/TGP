import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, User, Image as ImageIcon } from 'lucide-react';
import ScrollReveal from '../components/ui/ScrollReveal';
import MagneticButton from '../components/ui/MagneticButton';
import { useState } from 'react';
import './Programmes.css';

const Programmes = () => {
  const [isFlyerOpen, setIsFlyerOpen] = useState(false);
  return (
    <div className="programmes-page">
      <div className="programmes-hero text-center">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <ScrollReveal direction="up" delay={0.1}>
            <span className="about-tag" style={{ marginBottom: '1.5rem' }}>Pathways to Growth</span>
            <h1>Our Programmes</h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <p className="subtitle" style={{maxWidth: '700px', margin: '0 auto'}}>
              Designed to empower leaders to navigate complexity with confidence, build high-performing teams, and lead with purpose.
            </p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3}>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem', flexWrap: 'wrap' }}>
              <MagneticButton>
                <a href="#shikhar" className="btn btn-primary" style={{ padding: '0.8rem 2rem' }}>Explore Shikhar</a>
              </MagneticButton>
              <MagneticButton>
                <a href="#aarohan" className="btn btn-secondary" style={{ padding: '0.8rem 2rem', background: 'transparent', borderColor: 'var(--color-gold)', color: 'var(--color-gold)' }}>Explore Aarohan</a>
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </div>
      
      <hr className="section-separator" />
      <section className="section section-decorated paripakv-bg-wrap">
        <div className="paripakv-bg" style={{ backgroundImage: "url('/services-bg.png')", opacity: 0.15 }}></div>
        <div className="container">
          <div className="programmes-detailed-list">
            
            {/* ── Shikhar ── */}
            <div className="programme-detailed-card" id="shikhar">
              <div className="programme-detailed-image shikhar-bg"></div>
              <ScrollReveal direction="up" delay={0.1} className="programme-detailed-content">
                <div className="programme-icon-wrap">
                  <Sparkles className="text-gold" size={28} />
                </div>
                <span className="programme-tag">Flagship Cohort</span>
                <h2>Shikhar: A Leadership Coaching Journey for Women Professionals</h2>
                  
                  <p>
                    <strong>Shikhar</strong> is an exclusive group coaching program for ambitious mid-career women professionals (30–40 years) who are ready to step into larger leadership roles with confidence and purpose.
                  </p>
                  <p>
                    Designed for professionals navigating the transition from managing work to leading people, influence, and strategy, the program helps participants strengthen their leadership presence, navigate organizational dynamics effectively, and accelerate their career growth.
                  </p>
                  <p>
                    Conducted over 8–10 weeks, Shikhar brings together a carefully curated cohort of 6–8 professionals for engaging weekly group coaching sessions. The intimate cohort creates a confidential, supportive environment where participants learn from one another's experiences while receiving structured coaching, practical frameworks, and actionable insights.
                  </p>

                  <h3>What You Will Achieve</h3>
                  <ul>
                    <li>Gain clarity on their leadership vision, strengths, and authentic leadership brand.</li>
                    <li>Build the confidence to lead teams, influence stakeholders, and make high-impact decisions.</li>
                    <li>Strengthen executive presence through effective communication, strategic networking, and increased organizational visibility.</li>
                    <li>Overcome limiting beliefs such as self-doubt, imposter syndrome, and hesitation in taking on larger responsibilities.</li>
                    <li>Develop practical strategies to navigate workplace challenges, organizational politics, and career transitions with confidence.</li>
                    <li>Create a personalized 6–12 month leadership and career advancement roadmap with clear goals, milestones, and accountability.</li>
                  </ul>
                  
                  <h3>Ideal Participants</h3>
                  <p>
                    Mid-career professional women (30-40years), working for about 10-12 years in services sectors like IT services, Banking & Financial Services, Consulting etc. Should have an ambition for career growth and progression. Should be willing to make the time commitment for the weekly sessions and for taking steps towards achieving her aspiration (since this is a group session there will not be any flexibility in scheduling the weekly sessions).
                  </p>

                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                    <MagneticButton>
                      <a href="https://docs.google.com/forms/d/e/1FAIpQLScqHDm8OXbFnHkDa4sNxjCY59VcXWz75BRfVeeRfycFAn3nUA/viewform?usp=header" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-flex', alignSelf: 'flex-start' }}>
                        Apply for Shikhar <ArrowRight size={18} />
                      </a>
                    </MagneticButton>
                    
                    <MagneticButton>
                      <button onClick={() => setIsFlyerOpen(true)} className="btn btn-secondary" style={{ display: 'inline-flex', alignSelf: 'flex-start', background: 'transparent', color: 'var(--color-gold)', border: '1px solid rgba(200, 151, 62, 0.4)' }}>
                        <ImageIcon size={18} style={{ marginRight: '8px' }} /> View Program Flyer
                      </button>
                    </MagneticButton>
                  </div>
              </ScrollReveal>
            </div>

            {/* ── Aarohan ── */}
            <div className="programme-detailed-card reverse" id="aarohan">
              <div className="programme-detailed-image leadership-bg"></div>
              <ScrollReveal direction="up" delay={0.2} className="programme-detailed-content">
                <div className="programme-icon-wrap" style={{ background: 'rgba(85,107,47,0.1)', borderColor: 'rgba(85,107,47,0.2)' }}>
                  <User className="text-primary" size={28} />
                </div>
                <span className="programme-tag">1-on-1 Executive Coaching</span>
                <h2>Aarohan – Executive Leadership Coaching for the AI Age</h2>
                  <div className="programme-subtitle">Rise Above Change. Lead Beyond Technology.</div>
                  
                  <p>
                    <strong>Aarohan</strong> is an exclusive one-to-one executive leadership coaching journey designed for senior leaders who aspire to create extraordinary impact in an age defined by constant disruption.
                  </p>
                  <p>
                    This is not a programme about becoming a better manager. It is not a programme about learning AI tools. It is about becoming the kind of leader who creates exponential impact in a world where technology changes faster than organisations.
                  </p>
                  <p>
                    Rooted in timeless leadership principles and enriched by behavioural science, coaching psychology, neuroscience and Artificial Intelligence, Aarohan enables leaders to unlock their highest potential while building the capabilities required for the future of leadership. The journey is deeply personalised. Every conversation is centred around the leader’s context, aspirations and challenges—helping transform not only what they do, but who they become.
                  </p>

                  <h3>What You Will Achieve</h3>
                  <ul>
                    <li>Develop greater clarity of purpose, leadership identity and long-term vision.</li>
                    <li>Build sustainable micro habits that create exponential improvements in leadership effectiveness.</li>
                    <li>Strengthen executive presence and influence across teams, peers, boards and stakeholders.</li>
                    <li>Enhance decision-making in environments characterised by ambiguity, complexity and rapid technological change.</li>
                    <li>Learn how to leverage Artificial Intelligence as a strategic partner while preserving the uniquely human qualities of leadership.</li>
                    <li>Create a personalised leadership blueprint for sustained success over the next 3–5 years.</li>
                  </ul>

                  <h3>Ideal Participants</h3>
                  <p style={{ marginBottom: '1.5rem' }}>
                    Aarohan is designed for accomplished leaders preparing for their next chapter of growth. Participants typically bring 18–30 years of professional experience and a desire to lead with greater purpose, influence and impact. Ideal participants include:
                  </p>
                  <ul style={{ marginBottom: '1.5rem' }}>
                    <li>CXOs & Business Heads</li>
                    <li>Senior Vice Presidents and Vice Presidents</li>
                    <li>Functional Leaders</li>
                    <li>Digital and Transformation Leaders</li>
                    <li>Entrepreneurs and Founders</li>
                    <li>High-potential executives preparing for enterprise leadership</li>
                  </ul>

                  <MagneticButton>
                    <Link to="/contact" className="btn btn-primary mt-4" style={{ display: 'inline-flex', alignSelf: 'flex-start' }}>
                      Enquire about Aarohan <ArrowRight size={18} />
                    </Link>
                  </MagneticButton>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* ── Flyer Modal Overlay ── */}
      {isFlyerOpen && (
        <div className="flyer-modal-overlay" onClick={() => setIsFlyerOpen(false)}>
          <div className="flyer-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="flyer-modal-close" onClick={() => setIsFlyerOpen(false)}>×</button>
            <img src="/shikhar-flyer.png" alt="Shikhar Program Flyer" />
          </div>
        </div>
      )}

    </div>
  );
};

export default Programmes;
