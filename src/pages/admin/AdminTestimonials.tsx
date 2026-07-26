import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, MessageSquareQuote } from 'lucide-react';
import { fetchTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../../lib/api';

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  metric: string;
  image: string;
  videoUrl: string;
  published: boolean;
  createdAt: string;
}

const emptyTestimonial = {
  name: '', role: '', company: '', quote: '', metric: '', videoUrl: '', published: true,
};

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyTestimonial);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  useEffect(() => { loadTestimonials(); }, []);

  const loadTestimonials = async () => {
    try {
      const data = await fetchTestimonials(true);
      setTestimonials(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const showToast = (message: string, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  const openCreate = () => {
    setEditId(null);
    setForm(emptyTestimonial);
    setImageFile(null);
    setImagePreview('');
    setShowModal(true);
  };

  const openEdit = (t: Testimonial) => {
    setEditId(t._id);
    setForm({
      name: t.name, role: t.role, company: t.company, quote: t.quote,
      metric: t.metric, videoUrl: t.videoUrl, published: t.published,
    });
    setImagePreview(t.image ? `/api${t.image}` : '');
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
      formData.append('name', form.name);
      formData.append('role', form.role);
      formData.append('company', form.company);
      formData.append('quote', form.quote);
      formData.append('metric', form.metric);
      formData.append('videoUrl', form.videoUrl);
      formData.append('published', String(form.published));
      if (imageFile) formData.append('image', imageFile);

      if (editId) {
        await updateTestimonial(editId, formData);
        showToast('Testimonial updated');
      } else {
        await createTestimonial(formData);
        showToast('Testimonial created');
      }
      setShowModal(false);
      loadTestimonials();
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to save', 'error');
    } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    try {
      await deleteTestimonial(id);
      showToast('Testimonial deleted');
      loadTestimonials();
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
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}>Testimonials</h1>
          <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.875rem', margin: 0 }}>Manage success stories and testimonials</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openCreate}><Plus size={16} /> Add Testimonial</button>
      </div>

      {testimonials.length === 0 ? (
        <div className="admin-table-container">
          <div className="admin-empty-state">
            <div className="admin-empty-icon"><MessageSquareQuote size={28} /></div>
            <h3>No testimonials yet</h3>
            <p>Add your first testimonial to showcase on the website.</p>
            <button className="admin-btn admin-btn-primary" onClick={openCreate}><Plus size={16} /> Add Testimonial</button>
          </div>
        </div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Person</th>
                <th>Quote</th>
                <th>Metric</th>
                <th>Media</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map(t => (
                <tr key={t._id}>
                  <td>
                    <div className="table-cell-thumb">
                      {t.image ? <img src={`/api${t.image}`} alt="" className="table-thumb" style={{ borderRadius: '50%' }} /> : <div className="table-thumb" style={{ borderRadius: '50%', background: 'var(--admin-gold-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: 'var(--admin-gold)' }}>{t.name.charAt(0)}</div>}
                      <div>
                        <div className="table-item-title">{t.name}</div>
                        <div className="table-item-subtitle">{t.role}{t.company ? ` at ${t.company}` : ''}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--admin-text-muted)', fontSize: '0.8125rem' }}>"{t.quote.substring(0, 60)}..."</td>
                  <td style={{ color: 'var(--admin-text-muted)', fontSize: '0.8125rem' }}>{t.metric || '—'}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {t.image && <span className="admin-badge" style={{ background: 'var(--admin-info-bg)', color: 'var(--admin-info)' }}>Photo</span>}
                      {t.videoUrl && <span className="admin-badge" style={{ background: 'var(--admin-success-bg)', color: 'var(--admin-success)' }}>Video</span>}
                      {!t.image && !t.videoUrl && <span style={{ color: 'var(--admin-text-dim)', fontSize: '0.8125rem' }}>—</span>}
                    </div>
                  </td>
                  <td style={{ color: 'var(--admin-text-muted)', fontSize: '0.8125rem' }}>{formatDate(t.createdAt)}</td>
                  <td><span className={`admin-badge ${t.published ? 'published' : 'draft'}`}>{t.published ? 'Published' : 'Draft'}</span></td>
                  <td>
                    <div className="admin-actions">
                      <button className="admin-action-btn" onClick={() => openEdit(t)} title="Edit"><Edit2 size={14} /></button>
                      <button className="admin-action-btn danger" onClick={() => handleDelete(t._id)} title="Delete"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>{editId ? 'Edit Testimonial' : 'New Testimonial'}</h2>
              <button className="admin-modal-close" onClick={() => setShowModal(false)}><X size={16} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="admin-modal-body">
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Name *</label>
                    <input className="admin-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required placeholder="Full name" />
                  </div>
                  <div className="admin-form-group">
                    <label>Role *</label>
                    <input className="admin-input" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} required placeholder="e.g. VP of Engineering" />
                  </div>
                </div>
                <div className="admin-form-group">
                  <label>Company</label>
                  <input className="admin-input" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Company name" />
                </div>
                <div className="admin-form-group">
                  <label>Quote / Testimonial *</label>
                  <textarea className="admin-textarea" value={form.quote} onChange={e => setForm({ ...form, quote: e.target.value })} required placeholder="What they said about The Growth Project..." rows={4} />
                </div>
                <div className="admin-form-group">
                  <label>Key Metric / Achievement</label>
                  <input className="admin-input" value={form.metric} onChange={e => setForm({ ...form, metric: e.target.value })} placeholder="e.g. 40% increase in team retention" />
                </div>
                <div className="admin-form-group">
                  <label>Photo</label>
                  <input type="file" className="admin-file-input" accept="image/*" onChange={handleImageChange} />
                  {imagePreview && <img src={imagePreview} alt="Preview" className="admin-image-preview" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }} />}
                </div>
                <div className="admin-form-group">
                  <label>Video URL (YouTube / Vimeo)</label>
                  <input className="admin-input" value={form.videoUrl} onChange={e => setForm({ ...form, videoUrl: e.target.value })} placeholder="https://youtube.com/watch?v=..." />
                </div>
                <div className="admin-form-group">
                  <div className="admin-checkbox-group">
                    <input type="checkbox" checked={form.published} onChange={e => setForm({ ...form, published: e.target.checked })} id="test-published" />
                    <label htmlFor="test-published" style={{ margin: 0 }}>Published</label>
                  </div>
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
                  {saving ? 'Saving...' : editId ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toast.show && <div className={`admin-toast ${toast.type}`}><p>{toast.message}</p></div>}
    </div>
  );
};

export default AdminTestimonials;
