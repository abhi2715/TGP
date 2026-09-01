import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { fetchBlog, getImageUrl } from '../lib/api';
import './Blog.css';

interface BlogData {
  _id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  coverImage: string;
  readTime: string;
  createdAt: string;
}

interface BlogDetailProps {
  blogId?: string;
  isModal?: boolean;
  onClose?: () => void;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ blogId, isModal, onClose }) => {
  const { id } = useParams<{ id: string }>();
  const activeId = blogId || id;
  const [blog, setBlog] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (activeId) loadBlog(activeId);
  }, [activeId]);

  const loadBlog = async (fetchId: string) => {
    try {
      setLoading(true);
      const data = await fetchBlog(fetchId);
      setBlog(data);
    } catch (err) {
      setError('Blog not found');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  // Simple markdown-like rendering: paragraphs, headers, bold, lists
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let listItems: string[] = [];

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`}>
            {listItems.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />)}
          </ul>
        );
        listItems = [];
      }
    };

    lines.forEach((line, i) => {
      const trimmed = line.trim();
      
      if (trimmed.startsWith('### ')) {
        flushList();
        elements.push(<h3 key={i}>{trimmed.slice(4)}</h3>);
      } else if (trimmed.startsWith('## ')) {
        flushList();
        elements.push(<h2 key={i}>{trimmed.slice(3)}</h2>);
      } else if (trimmed.startsWith('> ')) {
        flushList();
        elements.push(<blockquote key={i}>{trimmed.slice(2)}</blockquote>);
      } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        listItems.push(trimmed.slice(2));
      } else if (trimmed === '') {
        flushList();
      } else {
        flushList();
        elements.push(
          <p key={i} dangerouslySetInnerHTML={{ __html: trimmed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
        );
      }
    });
    flushList();
    return elements;
  };

  if (loading) {
    return (
      <div className={isModal ? "blog-modal-inner" : "blog-detail-page"} style={{ minHeight: isModal ? '300px' : '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 32, height: 32, border: '3px solid var(--color-border)', borderTopColor: 'var(--color-secondary)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className={isModal ? "blog-modal-inner" : "blog-detail-page"} style={{ minHeight: isModal ? '300px' : '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
        <h2>Blog not found</h2>
        {!isModal && <Link to="/blog" className="btn btn-secondary">Back to blogs</Link>}
        {isModal && onClose && <button onClick={onClose} className="btn btn-secondary">Close</button>}
      </div>
    );
  }

  return (
    <div className={isModal ? "blog-modal-inner" : "blog-detail-page"}>
      <div className="container blog-article-container" style={isModal ? { padding: '2rem' } : undefined}>
        {!isModal && <Link to="/blog" className="back-link"><ArrowLeft size={16} /> Back to all articles</Link>}
        
        {blog.coverImage && (
          <figure className="article-hero-image" style={{ marginBottom: '2rem' }}>
            <img 
              src={getImageUrl(blog.coverImage)} 
              alt={blog.title} 
              style={{ maxHeight: '300px', width: '100%', objectFit: 'contain', backgroundColor: 'var(--color-surface)', borderRadius: '12px' }} 
            />
          </figure>
        )}

        <header className="article-header">
          <span className="blog-category-tag">{blog.category}</span>
          <h1 style={isModal ? { fontSize: 'clamp(2rem, 4vw, 2.75rem)' } : undefined}>{blog.title}</h1>
          <p className="article-subtitle">{blog.excerpt}</p>
          
          <div className="article-meta-large">
            <div className="author-info">
              <img src="/pooja-sharma-bg-less.png" alt={blog.author} className="author-avatar" />
              <div>
                <span className="author-name">{blog.author}</span>
                <span className="author-title">The Growth Project</span>
              </div>
            </div>
            <div className="post-info">
              <span className="date">{formatDate(blog.createdAt)}</span>
              <span className="dot">•</span>
              <span className="read-time"><Clock size={14}/> {blog.readTime}</span>
            </div>
          </div>
        </header>

        <article className="article-content" style={{ marginTop: '3rem' }}>
          {renderContent(blog.content)}
        </article>
      </div>
    </div>
  );
};

export default BlogDetail;
