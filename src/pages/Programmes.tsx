import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, User } from 'lucide-react';
import ScrollReveal from '../components/ui/ScrollReveal';
import MagneticButton from '../components/ui/MagneticButton';
import './Programmes.css';

const Programmes = () => {
  return (
    <div className="programmes-page">
      <div className="page-header text-center">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <ScrollReveal direction="up" delay={0.1}>
            <span className="about-tag" style={{ marginBottom: '1.5rem' }}>Pathways to Growth</span>
            <h1>Our Programmes</h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <p className="subtitle" style={{maxWidth: '700px', margin: '0 auto', color: 'var(--color-text)'}}>
              Designed to empower leaders to navigate complexity with confidence, build high-performing teams, and lead with purpose.
            </p>
          </ScrollReveal>
        </div>
      </div>
      
      <hr className="section-separator" />
      <section className="section section-decorated paripakv-bg-wrap">
        <div className="paripakv-bg" style={{ backgroundImage: "url('/services-bg.png')", opacity: 0.15 }}></div>
        <div className="container">
          <div className="programmes-list">
            
            {/* Shikhar */}
            <ScrollReveal direction="3d-up" delay={0.1}>
              <div className="programme-card-large glass-card">
                <div className="programme-image shikhar-bg" />
                <div className="programme-content">
                  <div className="programme-icon-wrap">
                    <Sparkles className="text-gold" size={28} />
                  </div>
                  <span className="programme-tag">Flagship Cohort</span>
                  <h2>Shikhar</h2>
                  <p>
                    Join the next Shikhar cohort—an exclusive coaching program designed for ambitious professionals ready to accelerate their growth. Shikhar focuses on providing clarity, building resilience, and fostering sustainable success.
                  </p>
                  <p>
                    Experience deep reflection, peer learning, and personalized frameworks that help you chart a definitive path forward.
                  </p>
                  <MagneticButton>
                    <a href="https://forms.gle/MPUK3qRQtEh4Lz8x8" target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-4">
                      Apply Now to Shikhar <ArrowRight size={18} />
                    </a>
                  </MagneticButton>
                </div>
              </div>
            </ScrollReveal>

            {/* Leadership Coaching */}
            <ScrollReveal direction="3d-up" delay={0.2}>
              <div className="programme-card-large glass-card">
                <div className="programme-image leadership-bg" />
                <div className="programme-content">
                  <div className="programme-icon-wrap" style={{ background: 'rgba(85,107,47,0.1)', borderColor: 'rgba(85,107,47,0.2)' }}>
                    <User className="text-primary" size={28} />
                  </div>
                  <h2>Leadership Coaching</h2>
                  <p>
                    Having led large-scale transformations across global organizations, I understand that leadership today is less about authority and more about clarity, connection, and courage. My coaching empowers leaders to navigate complexity with confidence, build high-performing teams, and lead with purpose in a rapidly evolving world.
                  </p>
                  <p>
                    I bring the perspective of a strategist, the rigor of a business leader, and the empathy of a coach to every engagement. Together, we explore what it means to lead authentically while creating impact that endures. My mission is to help leaders unlock their full potential and shape organizations that are as human as they are high-performing.
                  </p>
                  <MagneticButton>
                    <Link to="/contact" className="btn btn-secondary mt-4">
                      Enquire Now
                    </Link>
                  </MagneticButton>
                </div>
              </div>
            </ScrollReveal>



          </div>
        </div>
      </section>
    </div>
  );
};

export default Programmes;
