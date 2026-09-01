import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, FileText } from 'lucide-react';
import { fetchBlogs, createBlog, updateBlog, deleteBlog, getImageUrl } from '../../lib/api';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  coverImage: string;
  readTime: string;
  published: boolean;
  createdAt: string;
}

const emptyBlog = {
  title: '', category: 'Leadership', excerpt: '', content: '',
  author: 'Dr. Pooja Sharma', readTime: '5 min read', published: true,
};

const categories = ['Leadership', 'Career', 'Growth', 'Mindset', 'Productivity', 'Communication'];

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyBlog);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  useEffect(() => { loadBlogs(); }, []);

  const loadBlogs = async () => {
    try {
      const data = await fetchBlogs(true);
      setBlogs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  const openCreate = () => {
    setEditId(null);
    setForm(emptyBlog);
    setImageFile(null);
    setImagePreview('');
    setShowModal(true);
  };

  const openEdit = (blog: Blog) => {
    setEditId(blog._id);
    setForm({
      title: blog.title,
      category: blog.category,
      excerpt: blog.excerpt,
      content: blog.content,
      author: blog.author,
      readTime: blog.readTime,
      published: blog.published,
    });
    setImagePreview(blog.coverImage ? getImageUrl(blog.coverImage) : '');
    setImageFile(null);
    setShowModal(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('category', form.category);
      formData.append('excerpt', form.excerpt);
      formData.append('content', form.content);
      formData.append('author', form.author);
      formData.append('readTime', form.readTime);
      formData.append('published', String(form.published));
      if (imageFile) formData.append('coverImage', imageFile);

      if (editId) {
        await updateBlog(editId, formData);
        showToast('Blog updated successfully');
      } else {
        await createBlog(formData);
        showToast('Blog created successfully');
      }
      setShowModal(false);
      loadBlogs();
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to save', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;
    try {
      await deleteBlog(id);
      showToast('Blog deleted');
      loadBlogs();
    } catch (err) {
      showToast('Failed to delete', 'error');
      console.error(err);
    }
  };

  const formatDate = (date: string) => new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  if (loading) return <div className="admin-loading"><div className="admin-spinner" /></div>;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}>Blogs</h1>
          <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.875rem', margin: 0 }}>Manage your blog articles</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openCreate}>
          <Plus size={16} /> Add Blog
        </button>
      </div>

      {blogs.length === 0 ? (
        <div className="admin-table-container">
          <div className="admin-empty-state">
            <div className="admin-empty-icon"><FileText size={28} /></div>
            <h3>No blogs yet</h3>
            <p>Create your first blog article to get started.</p>
            <button className="admin-btn admin-btn-primary" onClick={openCreate}>
              <Plus size={16} /> Create Blog
            </button>
          </div>
        </div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Author</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map(blog => (
                <tr key={blog._id}>
                  <td>
                    <div className="table-cell-thumb">
                      {blog.coverImage && <img src={getImageUrl(blog.coverImage)} alt="" className="table-thumb" />}
                      <div>
                        <div className="table-item-title">{blog.title}</div>
                        <div className="table-item-subtitle">{blog.readTime}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="admin-badge" style={{ background: 'var(--admin-info-bg)', color: 'var(--admin-info)' }}>{blog.category}</span></td>
                  <td style={{ color: 'var(--admin-text-muted)' }}>{blog.author}</td>
                  <td style={{ color: 'var(--admin-text-muted)', fontSize: '0.8125rem' }}>{formatDate(blog.createdAt)}</td>
                  <td><span className={`admin-badge ${blog.published ? 'published' : 'draft'}`}>{blog.published ? 'Published' : 'Draft'}</span></td>
                  <td>
                    <div className="admin-actions">
                      <button className="admin-action-btn" onClick={() => openEdit(blog)} title="Edit"><Edit2 size={14} /></button>
                      <button className="admin-action-btn danger" onClick={() => handleDelete(blog._id)} title="Delete"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>{editId ? 'Edit Blog' : 'New Blog'}</h2>
              <button className="admin-modal-close" onClick={() => setShowModal(false)}><X size={16} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label>Title *</label>
                  <input className="admin-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required placeholder="Enter blog title" />
                </div>
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Category *</label>
                    <select className="admin-select" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label>Read Time</label>
                    <input className="admin-input" value={form.readTime} onChange={e => setForm({ ...form, readTime: e.target.value })} placeholder="5 min read" />
                  </div>
                </div>
                <div className="admin-form-group">
                  <label>Author</label>
                  <input className="admin-input" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} />
                </div>
                <div className="admin-form-group">
                  <label>Excerpt *</label>
                  <textarea className="admin-textarea" value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} required placeholder="Short summary of the blog..." rows={3} />
                </div>
                <div className="admin-form-group">
                  <label>Content * (Markdown supported)</label>
                  <textarea className="admin-textarea" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} required placeholder="Write your article content here... (Tip: You can paste YouTube links directly in the text)" rows={12} style={{ fontFamily: 'monospace', lineHeight: '1.6' }} />
                </div>
                <div className="admin-form-group">
                  <label>Cover Image</label>
                  <input type="file" className="admin-file-input" accept="image/*" onChange={handleImageChange} />
                  {imagePreview && <img src={imagePreview} alt="Preview" className="admin-image-preview" />}
                </div>
                <div className="admin-form-group">
                  <div className="admin-checkbox-group">
                    <input type="checkbox" checked={form.published} onChange={e => setForm({ ...form, published: e.target.checked })} id="published" />
                    <label htmlFor="published" style={{ margin: 0 }}>Published</label>
                  </div>
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
                  {saving ? 'Saving...' : editId ? 'Update Blog' : 'Create Blog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast.show && (
        <div className={`admin-toast ${toast.type}`}>
          <p>{toast.message}</p>
        </div>
      )}
    </div>
  );
};

export default AdminBlogs;
