import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, Quote, MessageSquareQuote } from 'lucide-react';
import ScrollReveal from '../components/ui/ScrollReveal';
import MagneticButton from '../components/ui/MagneticButton';
import { fetchTestimonials } from '../lib/api';
import './SuccessStories.css';

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  metric: string;
  image: string;
  videoUrl: string;
}

const SuccessStories = () => {
  const [stories, setStories] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [videoModal, setVideoModal] = useState<string | null>(null);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const data = await fetchTestimonials();
      setStories(data);
    } catch (err) {
      console.error('Failed to load testimonials:', err);
    } finally {
      setLoading(false);
    }
  };

  const getEmbedUrl = (url: string) => {
    // Convert YouTube watch URLs to embed URLs
    const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
    // Convert Vimeo URLs
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    return url;
  };

  return (
    <div className="success-stories-page">
      <div className="page-header success-stories-hero text-center">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <ScrollReveal direction="up" delay={0.1}>
            <span className="about-tag" style={{ marginBottom: '1.5rem' }}>Real Results</span>
            <h1>Transformations that speak for themselves.</h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <p className="subtitle" style={{ maxWidth: '800px', margin: '0 auto' }}>
              Meet the leaders, founders, and professionals who have accelerated their growth and redefined their potential with The Growth Project.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <section className="section section-decorated pt-0">
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <div style={{ width: 32, height: 32, border: '3px solid var(--color-border)', borderTopColor: 'var(--color-secondary)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto' }} />
              <p style={{ marginTop: '1rem', opacity: 0.6 }}>Loading testimonials...</p>
            </div>
          ) : stories.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem 2rem' }}>
              <MessageSquareQuote size={48} strokeWidth={1} style={{ color: 'var(--color-secondary)', opacity: 0.4, marginBottom: '1.5rem' }} />
              <h3 style={{ marginBottom: '0.75rem' }}>No testimonials yet</h3>
              <p style={{ opacity: 0.6, maxWidth: '500px', margin: '0 auto' }}>
                Success stories and testimonials will appear here once published. Check back soon!
              </p>
            </div>
          ) : (
            <div className="ss-grid">
              {stories.map((story, i) => (
                <ScrollReveal key={story._id} direction="up" delay={0.1 + (i % 3) * 0.1}>
                  <div className="ss-card glass-card">
                    <div className="ss-quote-icon">
                      <Quote size={32} />
                    </div>
                    <div className="ss-card-header">
                      <div className="ss-avatar-wrapper">
                        {story.image ? (
                          <img src={`/api${story.image}`} alt={story.name} className="ss-avatar" />
                        ) : (
                          <div className="ss-avatar ss-avatar-placeholder">
                            {story.name.charAt(0)}
                          </div>
                        )}
                        {story.videoUrl && (
                          <div className="ss-video-badge" onClick={() => setVideoModal(story.videoUrl)} style={{ cursor: 'pointer' }}>
                            <PlayCircle size={16} />
                          </div>
                        )}
                      </div>
                      <div className="ss-info">
                        <h3>{story.name}</h3>
                        <p className="ss-role">{story.role}{story.company ? ` at ${story.company}` : ''}</p>
                      </div>
                    </div>
                    {story.metric && (
                      <div className="ss-metric-box">
                        <span className="ss-metric-text">{story.metric}</span>
                      </div>
                    )}
                    <p className="ss-quote">"{story.quote}"</p>
                    {story.videoUrl && (
                      <button 
                        className="btn btn-secondary" 
                        style={{ marginTop: '1rem', fontSize: '0.8125rem', padding: '0.5rem 1rem' }}
                        onClick={() => setVideoModal(story.videoUrl)}
                      >
                        <PlayCircle size={14} /> Watch Video
                      </button>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════
          FINAL CTA — Dark Green Background
         ══════════════════════════════════ */}
      <section className="section final-cta" id="cta">
        <div className="container text-center" style={{ position: 'relative', zIndex: 1 }}>
          <ScrollReveal direction="3d-up">
            <h2>Ready to accelerate your Leadership journey?</h2>
            <p>
              Join hundreds of professionals who have transformed their Professional journey.
            </p>
            <div className="cta-group center">
              <MagneticButton>
                <Link to="/book-consultation" className="btn btn-primary">Book a conversation</Link>
              </MagneticButton>
              <MagneticButton>
                <Link to="/programmes" className="btn btn-secondary">Explore programmes</Link>
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Video Modal */}
      {videoModal && (
        <div 
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem',
            cursor: 'pointer',
          }}
          onClick={() => setVideoModal(null)}
        >
          <div 
            style={{ width: '100%', maxWidth: '800px', aspectRatio: '16/9', borderRadius: '12px', overflow: 'hidden' }}
            onClick={e => e.stopPropagation()}
          >
            <iframe
              src={getEmbedUrl(videoModal)}
              style={{ width: '100%', height: '100%', border: 'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Testimonial Video"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessStories;
