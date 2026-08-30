import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, BookOpen, MessageSquareQuote, Users, ArrowRight, Clock } from 'lucide-react';
import { fetchBlogs, fetchStudyMaterials, fetchTestimonials, fetchShikharUsers } from '../../lib/api';

interface BlogItem { _id: string; title: string; category: string; createdAt: string; published: boolean }
interface ShikharUserItem { _id: string; name: string; email: string; status: string; createdAt: string }

const AdminDashboard = () => {
  const [stats, setStats] = useState({ blogs: 0, materials: 0, testimonials: 0, pendingUsers: 0 });
  const [recentBlogs, setRecentBlogs] = useState<BlogItem[]>([]);
  const [recentUsers, setRecentUsers] = useState<ShikharUserItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [blogs, materials, testimonials, users] = await Promise.all([
        fetchBlogs(true),
        fetchStudyMaterials(true),
        fetchTestimonials(true),
        fetchShikharUsers(),
      ]);
      setStats({
        blogs: blogs.length,
        materials: materials.length,
        testimonials: testimonials.length,
        pendingUsers: users.filter((u: ShikharUserItem) => u.status === 'pending').length,
      });
      setRecentBlogs(blogs.slice(0, 5));
      setRecentUsers(users.slice(0, 5));
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  if (loading) {
    return <div className="admin-loading"><div className="admin-spinner" /></div>;
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}>Dashboard</h1>
        <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.875rem', margin: 0 }}>Welcome back. Here's an overview of your content.</p>
      </div>

      {/* Stats Grid */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="stat-card-header">
            <div className="stat-card-icon gold"><FileText size={20} /></div>
          </div>
          <div className="stat-card-value">{stats.blogs}</div>
          <div className="stat-card-label">Total Blogs</div>
        </div>
        <div className="admin-stat-card">
          <div className="stat-card-header">
            <div className="stat-card-icon blue"><BookOpen size={20} /></div>
          </div>
          <div className="stat-card-value">{stats.materials}</div>
          <div className="stat-card-label">Articles</div>
        </div>
        <div className="admin-stat-card">
          <div className="stat-card-header">
            <div className="stat-card-icon green"><MessageSquareQuote size={20} /></div>
          </div>
          <div className="stat-card-value">{stats.testimonials}</div>
          <div className="stat-card-label">Testimonials</div>
        </div>
        <div className="admin-stat-card">
          <div className="stat-card-header">
            <div className="stat-card-icon red"><Users size={20} /></div>
          </div>
          <div className="stat-card-value">{stats.pendingUsers}</div>
          <div className="stat-card-label">Pending Requests</div>
        </div>
      </div>

      {/* Recent Content */}
      <div className="admin-recent-grid">
        <div className="admin-recent-card">
          <div className="admin-recent-card-header">
            <h3>Recent Blogs</h3>
            <Link to="/admin/blogs" className="admin-btn admin-btn-secondary" style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem' }}>
              View All <ArrowRight size={12} />
            </Link>
          </div>
          {recentBlogs.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.8125rem', margin: 0 }}>No blogs yet</p>
            </div>
          ) : (
            <ul className="admin-recent-list">
              {recentBlogs.map(blog => (
                <li key={blog._id} className="admin-recent-item">
                  <div className="admin-recent-item-info">
                    <span>{blog.title}</span>
                    <span><Clock size={11} style={{ marginRight: 4, verticalAlign: 'middle' }} />{formatDate(blog.createdAt)}</span>
                  </div>
                  <span className={`admin-badge ${blog.published ? 'published' : 'draft'}`}>
                    {blog.published ? 'Published' : 'Draft'}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="admin-recent-card">
          <div className="admin-recent-card-header">
            <h3>Shikhar Requests</h3>
            <Link to="/admin/shikhar-users" className="admin-btn admin-btn-secondary" style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem' }}>
              View All <ArrowRight size={12} />
            </Link>
          </div>
          {recentUsers.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.8125rem', margin: 0 }}>No requests yet</p>
            </div>
          ) : (
            <ul className="admin-recent-list">
              {recentUsers.map(user => (
                <li key={user._id} className="admin-recent-item">
                  <div className="admin-recent-item-info">
                    <span>{user.name}</span>
                    <span>{user.email}</span>
                  </div>
                  <span className={`admin-badge ${user.status}`}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
