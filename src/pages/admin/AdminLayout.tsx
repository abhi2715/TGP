import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, BookOpen, MessageSquareQuote, Users, LogOut, Bell, Menu, X, Shield } from 'lucide-react';
import { verifyAdminToken, fetchShikharUsers } from '../../lib/api';
import './admin.css';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('tgp_admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    verifyAdminToken(token).then(valid => {
      if (!valid) {
        localStorage.removeItem('tgp_admin_token');
        navigate('/admin/login');
      }
    });
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('tgp_admin_token');
    if (token) {
      fetchShikharUsers()
        .then(users => {
          const pending = users.filter((u: { status: string }) => u.status === 'pending').length;
          setPendingCount(pending);
        })
        .catch(() => {});
    }
  }, [location.pathname]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('tgp_admin_token');
    navigate('/admin/login');
  };

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  const navItems = [
    { path: '/admin', icon: <LayoutDashboard size={18} />, label: 'Dashboard', exact: true },
    { path: '/admin/blogs', icon: <FileText size={18} />, label: 'Blogs' },
    { path: '/admin/study-materials', icon: <BookOpen size={18} />, label: 'Articles' },
    { path: '/admin/testimonials', icon: <MessageSquareQuote size={18} />, label: 'Testimonials' },
    { path: '/admin/shikhar-users', icon: <Users size={18} />, label: 'Shikhar Users', badge: pendingCount },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/admin" className="sidebar-brand">
            <div className="sidebar-brand-icon">TGP</div>
            <div className="sidebar-brand-text">
              <span>The Growth Project</span>
              <span>Admin Panel</span>
            </div>
          </Link>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-section-label">Main</div>
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${item.exact ? (location.pathname === item.path ? 'active' : '') : (isActive(item.path) ? 'active' : '')}`}
            >
              {item.icon}
              {item.label}
              {item.badge ? <span className="sidebar-badge">{item.badge}</span> : null}
            </Link>
          ))}

          <div className="sidebar-section-label">Quick Links</div>
          <Link to="/" className="sidebar-link" target="_blank">
            <Shield size={18} />
            View Website
          </Link>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user" onClick={handleLogout}>
            <div className="sidebar-avatar">
              <LogOut size={14} />
            </div>
            <div className="sidebar-user-info">
              <span>Admin</span>
              <span>Sign out</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="admin-main">
        <div className="admin-topbar">
          <div className="admin-topbar-left">
            <button className="topbar-icon-btn mobile-menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
          <div className="admin-topbar-right">
            <Link to="/admin/shikhar-users" className="topbar-icon-btn" title="Shikhar Requests">
              <Bell size={18} />
              {pendingCount > 0 && <span className="topbar-notification-dot" />}
            </Link>
          </div>
        </div>

        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
