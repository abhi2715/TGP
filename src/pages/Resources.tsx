import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download, BookOpen, Loader, X } from 'lucide-react';
import ScrollReveal from '../components/ui/ScrollReveal';
import MagneticButton from '../components/ui/MagneticButton';
import { fetchBlogs, fetchStudyMaterials } from '../lib/api';
import './Resources.css';

interface Blog {
  _id: string;
  title: string;
  category: string;
  excerpt: string;
  coverImage: string;
  readTime: string;
  createdAt: string;
  fileUrl?: string;
  fileName?: string;
}

interface StudyMaterial {
  _id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  fileUrl: string;
  fileName: string;
  coverImage?: string;
  readTime?: string;
}

const Resources = () => {
  const [activeTab, setActiveTab] = useState<'blogs' | 'study-material'>('blogs');
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [activePdfUrl, setActivePdfUrl] = useState('');

  const openPdf = (url: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActivePdfUrl(url);
    setPdfModalOpen(true);
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [blogsData, materialsData] = await Promise.all([
        fetchBlogs(),
        fetchStudyMaterials(),
      ]);
      setBlogs(blogsData);
      setMaterials(materialsData);
    } catch (err) {
      console.error('Failed to load resources:', err);
      // Fallback so it's always visible even if backend is down
      setBlogs([]);
      setMaterials([]);
    } finally {
      setLoading(false);
    }
  };

  const typeIcons: Record<string, string> = {
    Worksheet: '📋', Toolkit: '🧰', Template: '📄', Assessment: '📊', Guide: '📖', eBook: '📚',
  };

  return (
    <div className="resources-page">
      <section className="resources-hero text-center">
        <div className="container">
          <h1>Resources</h1>
          <p className="hero-sub">
            Explore our collection of blogs, frameworks, templates, and articles designed to accelerate your growth.
          </p>
        </div>
      </section>

      {/* Tab Switcher */}
      <section className="section">
        <div className="container">
          <ScrollReveal direction="up">
            <div className="resources-tabs">
              <button
                className={`resources-tab ${activeTab === 'blogs' ? 'active' : ''}`}
                onClick={() => setActiveTab('blogs')}
              >
                <FileText size={18} /> Blogs
                {blogs.length > 0 && <span className="tab-count">{blogs.length}</span>}
              </button>
              <button
                className={`resources-tab ${activeTab === 'study-material' ? 'active' : ''}`}
                onClick={() => setActiveTab('study-material')}
              >
                <BookOpen size={18} /> Articles
                {materials.length > 0 && <span className="tab-count">{materials.length}</span>}
              </button>
            </div>
          </ScrollReveal>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <Loader size={32} className="spin-animation" style={{ color: 'var(--color-secondary)', animation: 'spin 1s linear infinite' }} />
              <p style={{ marginTop: '1rem', color: 'var(--color-text)', opacity: 0.6 }}>Loading resources...</p>
            </div>
          ) : activeTab === 'blogs' ? (
            blogs.length === 0 ? (
              <div className="resources-empty">
                <FileText size={48} strokeWidth={1} />
                <h3>No blogs published yet</h3>
                <p>Check back soon for insightful articles on leadership, career growth, and personal development.</p>
              </div>
            ) : (
              <div className="resources-grid">
                {blogs.map((blog, idx) => {
                  const isPdf = !!blog.fileUrl;
                  const CardWrapper: any = isPdf ? 'div' : Link;
                  const wrapperProps = isPdf 
                    ? { className: "resource-card resource-card-blog", onClick: (e: React.MouseEvent) => openPdf(blog.fileUrl!, e), style: { cursor: 'pointer' } } 
                    : { className: "resource-card resource-card-blog", to: `/blog/${blog._id}` };

                  return (
                    <ScrollReveal key={blog._id} direction="up" delay={0.1 + (idx % 3) * 0.1}>
                      <CardWrapper {...wrapperProps}>
                        {blog.coverImage && (
                          <div className="resource-card-image">
                            <img src={blog.coverImage.startsWith('/') ? blog.coverImage : `/api${blog.coverImage}`} alt={blog.title} />
                          </div>
                        )}
                        <span className="res-type">{blog.category}</span>
                        <h3>{blog.title}</h3>
                        <p>{blog.excerpt}</p>
                        <div className="resource-card-meta" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: 'auto' }}>
                          <span>{blog.readTime}</span>
                          {isPdf ? (
                            <button onClick={(e) => openPdf(blog.fileUrl!, e)} className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                              <BookOpen size={14} /> Open & View
                            </button>
                          ) : (
                            <span>Read More →</span>
                          )}
                        </div>
                      </CardWrapper>
                    </ScrollReveal>
                  );
                })}
              </div>
            )
          ) : (
            materials.length === 0 ? (
              <div className="resources-empty">
                <BookOpen size={48} strokeWidth={1} />
                <h3>No articles available yet</h3>
                <p>Premium frameworks, worksheets, and templates will be available here soon.</p>
              </div>
            ) : (
              <div className="resources-grid">
                {materials.map((mat, idx) => (
                  <ScrollReveal key={mat._id} direction="up" delay={0.1 + (idx % 3) * 0.1}>
                    <div className="resource-card">
                      {mat.coverImage && (
                        <div className="resource-card-image">
                          <img src={mat.coverImage.startsWith('/') ? mat.coverImage : `/api${mat.coverImage}`} alt={mat.title} />
                        </div>
                      )}
                      {!mat.coverImage && <div className="res-icon">{typeIcons[mat.type] || '📄'}</div>}
                      <span className="res-type">{mat.type}</span>
                      <h3>{mat.title}</h3>
                      <p>{mat.description}</p>
                      {mat.fileUrl && (
                        <div className="resource-card-meta" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: 'auto', paddingTop: '1.5rem', gap: '0.5rem' }}>
                          {mat.readTime && <span>{mat.readTime}</span>}
                          <div style={{ display: 'flex', gap: '0.5rem', flex: 1, justifyContent: 'flex-end' }}>
                            <button 
                              onClick={(e) => openPdf(mat.fileUrl!, e)} 
                              className="btn btn-primary" 
                              style={{ flex: 1, padding: '0.4rem 1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
                            >
                              <BookOpen size={14} /> Open & View
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            )
          )}
        </div>
      </section>

      {/* ══════════════════════════════════
          FINAL CTA - Dark Green Background
         ══════════════════════════════════ */}
      <section className="section final-cta" id="cta">
        <div className="container text-center" style={{ position: 'relative', zIndex: 1 }}>
          <ScrollReveal direction="3d-up">
            <h2>Let's Get Started!</h2>
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

      {/* PDF Viewer Modal */}
      {pdfModalOpen && (
        <div className="pdf-modal-overlay" onClick={() => setPdfModalOpen(false)} style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)', zIndex: 9999,
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          padding: '2rem'
        }}>
          <div className="pdf-modal-content" onClick={e => e.stopPropagation()} style={{
            background: 'var(--color-bg)', width: '100%', maxWidth: '1200px', height: '90vh',
            borderRadius: '16px', display: 'flex', flexDirection: 'column', overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
          }}>
            <div className="pdf-modal-header" style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '1rem 2rem', borderBottom: '1px solid var(--color-border)'
            }}>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-heading)' }}>Document Viewer</h3>
              <div className="pdf-modal-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <a href={activePdfUrl} download className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Download size={16} /> Download
                </a>
                <button onClick={() => setPdfModalOpen(false)} style={{
                  background: 'transparent', border: 'none', color: 'var(--color-text)',
                  cursor: 'pointer', padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <X size={24} />
                </button>
              </div>
            </div>
            <div className="pdf-modal-body" style={{ flex: 1, width: '100%' }}>
              <iframe 
                src={activePdfUrl} 
                title="PDF Viewer"
                width="100%" 
                height="100%" 
                style={{ border: 'none' }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resources;
