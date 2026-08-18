import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download, BookOpen, Loader } from 'lucide-react';
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
}

interface StudyMaterial {
  _id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  fileUrl: string;
  fileName: string;
}

const Resources = () => {
  const [activeTab, setActiveTab] = useState<'blogs' | 'study-material'>('blogs');
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [loading, setLoading] = useState(true);

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
            Explore our collection of blogs, frameworks, templates, and study materials designed to accelerate your growth.
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
                <BookOpen size={18} /> Study Material
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
                {blogs.map((blog, idx) => (
                  <ScrollReveal key={blog._id} direction="up" delay={0.1 + (idx % 3) * 0.1}>
                    <Link to={`/blog/${blog._id}`} className="resource-card resource-card-blog">
                      {blog.coverImage && (
                        <div className="resource-card-image">
                          <img src={`/api${blog.coverImage}`} alt={blog.title} />
                        </div>
                      )}
                      <span className="res-type">{blog.category}</span>
                      <h3>{blog.title}</h3>
                      <p>{blog.excerpt}</p>
                      <div className="resource-card-meta">
                        <span>{blog.readTime}</span>
                        <span>Read More →</span>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            )
          ) : (
            materials.length === 0 ? (
              <div className="resources-empty">
                <BookOpen size={48} strokeWidth={1} />
                <h3>No study materials available yet</h3>
                <p>Premium frameworks, worksheets, and templates will be available here soon.</p>
              </div>
            ) : (
              <div className="resources-grid">
                {materials.map((mat, idx) => (
                  <ScrollReveal key={mat._id} direction="up" delay={0.1 + (idx % 3) * 0.1}>
                    <div className="resource-card">
                      <div className="res-icon">{typeIcons[mat.type] || '📄'}</div>
                      <span className="res-type">{mat.type}</span>
                      <h3>{mat.title}</h3>
                      <p>{mat.description}</p>
                      {mat.fileUrl && (
                        <a href={`/api${mat.fileUrl}`} download={mat.fileName} className="btn btn-secondary btn-full mt-auto" target="_blank" rel="noopener noreferrer">
                          <Download size={16} /> Download {mat.type}
                        </a>
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
          FINAL CTA — Dark Green Background
         ══════════════════════════════════ */}
      <section className="section final-cta" id="cta">
        <div className="container text-center" style={{ position: 'relative', zIndex: 1 }}>
          <ScrollReveal direction="3d-up">
            <h2>Get Started!</h2>
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
    </div>
  );
};

export default Resources;
