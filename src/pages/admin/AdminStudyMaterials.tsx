import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, BookOpen } from 'lucide-react';
import { fetchStudyMaterials, createStudyMaterial, updateStudyMaterial, deleteStudyMaterial } from '../../lib/api';

interface Material {
  _id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  fileUrl: string;
  fileName: string;
  published: boolean;
  createdAt: string;
}

const emptyMaterial = {
  title: '', description: '', category: 'Leadership', type: 'Guide', published: true,
};

const materialTypes = ['Worksheet', 'Toolkit', 'Template', 'Assessment', 'Guide', 'eBook'];
const categories = ['Leadership', 'Career', 'Growth', 'Mindset', 'Productivity', 'Communication'];

const AdminStudyMaterials = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyMaterial);
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  useEffect(() => { loadMaterials(); }, []);

  const loadMaterials = async () => {
    try {
      const data = await fetchStudyMaterials(true);
      setMaterials(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const showToast = (message: string, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  const openCreate = () => {
    setEditId(null);
    setForm(emptyMaterial);
    setFile(null);
    setShowModal(true);
  };

  const openEdit = (m: Material) => {
    setEditId(m._id);
    setForm({ title: m.title, description: m.description, category: m.category, type: m.type, published: m.published });
    setFile(null);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('category', form.category);
      formData.append('type', form.type);
      formData.append('published', String(form.published));
      if (file) formData.append('file', file);

      if (editId) {
        await updateStudyMaterial(editId, formData);
        showToast('Article updated');
      } else {
        await createStudyMaterial(formData);
        showToast('Article created');
      }
      setShowModal(false);
      loadMaterials();
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to save', 'error');
    } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this article?')) return;
    try {
      await deleteStudyMaterial(id);
      showToast('Article deleted');
      loadMaterials();
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
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}>Articles</h1>
          <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.875rem', margin: 0 }}>Manage downloadable resources</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openCreate}><Plus size={16} /> Add Material</button>
      </div>

      {materials.length === 0 ? (
        <div className="admin-table-container">
          <div className="admin-empty-state">
            <div className="admin-empty-icon"><BookOpen size={28} /></div>
            <h3>No articles yet</h3>
            <p>Upload your first article to get started.</p>
            <button className="admin-btn admin-btn-primary" onClick={openCreate}><Plus size={16} /> Add Material</button>
          </div>
        </div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Type</th>
                <th>File</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {materials.map(m => (
                <tr key={m._id}>
                  <td>
                    <div className="table-item-title">{m.title}</div>
                    <div className="table-item-subtitle" style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.description}</div>
                  </td>
                  <td><span className="admin-badge" style={{ background: 'var(--admin-info-bg)', color: 'var(--admin-info)' }}>{m.category}</span></td>
                  <td style={{ color: 'var(--admin-text-muted)', fontSize: '0.8125rem' }}>{m.type}</td>
                  <td style={{ color: 'var(--admin-text-muted)', fontSize: '0.8125rem' }}>{m.fileName || ' - '}</td>
                  <td style={{ color: 'var(--admin-text-muted)', fontSize: '0.8125rem' }}>{formatDate(m.createdAt)}</td>
                  <td><span className={`admin-badge ${m.published ? 'published' : 'draft'}`}>{m.published ? 'Published' : 'Draft'}</span></td>
                  <td>
                    <div className="admin-actions">
                      <button className="admin-action-btn" onClick={() => openEdit(m)} title="Edit"><Edit2 size={14} /></button>
                      <button className="admin-action-btn danger" onClick={() => handleDelete(m._id)} title="Delete"><Trash2 size={14} /></button>
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
              <h2>{editId ? 'Edit Article' : 'New Article'}</h2>
              <button className="admin-modal-close" onClick={() => setShowModal(false)}><X size={16} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label>Title *</label>
                  <input className="admin-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required placeholder="e.g. Career Pivot Framework" />
                </div>
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Category *</label>
                    <select className="admin-select" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label>Type</label>
                    <select className="admin-select" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                      {materialTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div className="admin-form-group">
                  <label>Description *</label>
                  <textarea className="admin-textarea" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required placeholder="Describe what this material covers... (Tip: You can paste YouTube links directly in the text)" rows={4} />
                </div>
                <div className="admin-form-group">
                  <label>File (PDF, DOC, etc.)</label>
                  <input type="file" className="admin-file-input" onChange={e => setFile(e.target.files?.[0] || null)} />
                </div>
                <div className="admin-form-group">
                  <div className="admin-checkbox-group">
                    <input type="checkbox" checked={form.published} onChange={e => setForm({ ...form, published: e.target.checked })} id="mat-published" />
                    <label htmlFor="mat-published" style={{ margin: 0 }}>Published</label>
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

export default AdminStudyMaterials;
