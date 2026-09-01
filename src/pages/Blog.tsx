import { useState, useEffect } from 'react';

import { Clock, ArrowRight, BookOpen, FileText, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../components/ui/ScrollReveal';
import MagneticButton from '../components/ui/MagneticButton';
import { fetchBlogs, getImageUrl } from '../lib/api';
import BlogDetail from './BlogDetail';
import './Blog.css';

interface Blog {
  _id: string;
  title: string;
  category: string;
  excerpt: string;
  coverImage: string;
  readTime: string;
  author: string;
  createdAt: string;
}

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [articles, setArticles] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);

  const categories = ["All", "Leadership", "Career", "Growth", "Mindset", "Productivity", "Communication"];

  useEffect(() => {
    loadBlogs();
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedBlogId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedBlogId]);

  const loadBlogs = async () => {
    try {
      const data = await fetchBlogs();
      setArticles(data);
    } catch (err) {
      console.error('Failed to load blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const handleBlogClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setSelectedBlogId(id);
  };

  const filteredArticles = activeCategory === 'All' 
    ? articles 
    : articles.filter(a => a.category === activeCategory);

  const featured = filteredArticles[0];
  const regularArticles = filteredArticles.slice(1);

  return (
    <div className="blog-page">
      {/* ── Blog Modal ── */}
      <AnimatePresence>
        {selectedBlogId && (
          <div className="blog-modal-overlay" onClick={() => setSelectedBlogId(null)}>
            <div className="blog-modal-content" onClick={e => e.stopPropagation()}>
              <button className="blog-modal-close" onClick={() => setSelectedBlogId(null)}>
                <X size={20} />
              </button>
              <BlogDetail blogId={selectedBlogId} isModal={true} onClose={() => setSelectedBlogId(null)} />
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Immersive Hero ── */}
      <section className="blog-hero bg-surface">
        <div className="container">
          <ScrollReveal direction="up">
            <div className="blog-header-content text-center">
              <span className="blog-tag"><BookOpen size={18}/> Editorial & Insights</span>
              <h1>The Growth Library</h1>
              <p>Expert articles, cognitive frameworks, and strategic insights to accelerate your personal and professional development.</p>
            </div>
          </ScrollReveal>
          
          {/* Filter Bar */}
          <ScrollReveal direction="up" delay={0.2}>
            <div className="blog-categories-wrapper">
              <div className="blog-categories">
                {categories.map((cat, idx) => (
                  <button 
                    key={idx} 
                    className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {loading ? (
        <section className="section">
          <div className="container text-center" style={{ padding: '4rem 0' }}>
            <div style={{ width: 32, height: 32, border: '3px solid var(--color-border)', borderTopColor: 'var(--color-secondary)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto' }} />
            <p style={{ marginTop: '1rem', opacity: 0.6 }}>Loading articles...</p>
          </div>
        </section>
      ) : filteredArticles.length === 0 ? (
        <section className="section">
          <div className="container text-center" style={{ padding: '5rem 0' }}>
            <FileText size={48} strokeWidth={1} style={{ color: 'var(--color-secondary)', opacity: 0.4, marginBottom: '1.5rem' }} />
            <h3 style={{ marginBottom: '0.75rem' }}>No articles yet</h3>
            <p style={{ opacity: 0.6, maxWidth: '400px', margin: '0 auto' }}>
              {activeCategory === 'All' 
                ? 'Blog articles will appear here once published.' 
                : `No articles in the "${activeCategory}" category yet.`}
            </p>
          </div>
        </section>
      ) : (
        <>
          {/* ── Featured Editorial ── */}
          {featured && (
            <section className="section featured-section">
              <div className="container">
                <ScrollReveal direction="up">
                  <a href={`/blog/${featured._id}`} onClick={(e) => handleBlogClick(e, featured._id)} className="featured-editorial-card">
                    <div className="fe-image">
                      <img src={featured.coverImage ? getImageUrl(featured.coverImage) : '/hero.png'} alt={featured.title} />
                      <div className="fe-overlay"></div>
                    </div>
                    <div className="fe-content-box">
                      <span className="fe-category">{featured.category}</span>
                      <h2>{featured.title}</h2>
                      <p>{featured.excerpt}</p>
                      
                      <div className="fe-footer">
                        <div className="fe-meta">
                          <span className="fe-author">{featured.author}</span>
                          <span className="dot">•</span>
                          <span className="fe-date">{formatDate(featured.createdAt)}</span>
                        </div>
                        <span className="fe-read-more">Read Article <ArrowRight size={16}/></span>
                      </div>
                    </div>
                  </a>
                </ScrollReveal>
              </div>
            </section>
          )}

          {/* ── Editorial Grid ── */}
          {regularArticles.length > 0 && (
            <section className="section editorial-grid-section">
              <div className="container">
                <div className="editorial-masonry">
                  {regularArticles.map((article, index) => (
                    <motion.div
                      key={article._id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                    >
                      <a href={`/blog/${article._id}`} onClick={(e) => handleBlogClick(e, article._id)} className="editorial-card">
                        <div className="ec-image-wrapper">
                          <img src={article.coverImage ? getImageUrl(article.coverImage) : '/hero.png'} alt={article.title} />
                          <span className="ec-category-badge">{article.category}</span>
                        </div>
                        <div className="ec-content">
                          <h3>{article.title}</h3>
                          <div className="ec-meta">
                            <span>{formatDate(article.createdAt)}</span>
                            <span className="dot">•</span>
                            <span><Clock size={14}/> {article.readTime}</span>
                          </div>
                        </div>
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* ── Newsletter ── */}
      <section className="section blog-newsletter">
        <div className="container">
          <ScrollReveal direction="up">
            <div className="newsletter-box">
              <div className="newsletter-text">
                <h2>The Weekly Digest</h2>
                <p>Join over 10,000 ambitious professionals receiving our latest frameworks, leadership strategies, and exclusive insights directly in their inbox.</p>
              </div>
              <div className="newsletter-form-container">
                <form className="newsletter-form-premium" onSubmit={e => e.preventDefault()}>
                  <input type="email" placeholder="Enter your email address" required />
                  <MagneticButton>
                    <button type="submit" className="btn btn-primary">Subscribe</button>
                  </MagneticButton>
                </form>
                <p className="spam-note">No spam. Unsubscribe at any time.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Blog;
