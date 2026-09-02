import { useState, useEffect } from 'react';
import { Check, X, Trash2, Users, Clock, CheckCircle, XCircle } from 'lucide-react';
import { fetchShikharUsers, approveShikharUser, denyShikharUser, deleteShikharUser, toggleUserSessionUnlock } from '../../lib/api';

interface ShikharUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  status: 'pending' | 'approved' | 'denied';
  notes: string;
  lastLoginAttempt: string;
  createdAt: string;
  unlockedSessions?: number[];
}

const AdminShikharUsers = () => {
  const [users, setUsers] = useState<ShikharUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'denied'>('all');
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  useEffect(() => { loadUsers(); }, []);

  async function loadUsers() {
    try {
      const data = await fetchShikharUsers();
      setUsers(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const showToast = (message: string, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  const handleApprove = async (id: string) => {
    try {
      await approveShikharUser(id);
      showToast('User approved! They can now access Shikhar.');
      loadUsers();
    } catch (err) {
      showToast('Failed to approve', 'error');
      console.error(err);
    }
  };

  const handleDeny = async (id: string) => {
    try {
      await denyShikharUser(id);
      showToast('User access denied.');
      loadUsers();
    } catch (err) {
      showToast('Failed to deny', 'error');
      console.error(err);
    }
  };

  const handleToggleSession = async (id: string, sessionId: number, currentStatus: boolean) => {
    try {
      await toggleUserSessionUnlock(id, sessionId, !currentStatus);
      showToast(`Session ${sessionId} ${!currentStatus ? 'unlocked' : 'locked'} successfully.`);
      loadUsers();
    } catch (err) {
      showToast('Failed to toggle session', 'error');
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this user record?')) return;
    try {
      await deleteShikharUser(id);
      showToast('User record deleted');
      loadUsers();
    } catch (err) {
      showToast('Failed to delete', 'error');
      console.error(err);
    }
  };

  const filteredUsers = filter === 'all' ? users : users.filter(u => u.status === filter);
  const counts = {
    all: users.length,
    pending: users.filter(u => u.status === 'pending').length,
    approved: users.filter(u => u.status === 'approved').length,
    denied: users.filter(u => u.status === 'denied').length,
  };

  const formatDate = (date: string) => {
    if (!date) return ' - ';
    return new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  if (loading) return <div className="admin-loading"><div className="admin-spinner" /></div>;

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}>Shikhar Users</h1>
        <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.875rem', margin: 0 }}>Manage access requests for the Shikhar programme</p>
      </div>

      {/* Stats */}
      <div className="admin-stats-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="admin-stat-card" style={{ cursor: 'pointer', borderColor: filter === 'all' ? 'var(--admin-gold)' : undefined }} onClick={() => setFilter('all')}>
          <div className="stat-card-header"><div className="stat-card-icon gold"><Users size={20} /></div></div>
          <div className="stat-card-value">{counts.all}</div>
          <div className="stat-card-label">Total Requests</div>
        </div>
        <div className="admin-stat-card" style={{ cursor: 'pointer', borderColor: filter === 'pending' ? 'var(--admin-warning)' : undefined }} onClick={() => setFilter('pending')}>
          <div className="stat-card-header"><div className="stat-card-icon" style={{ background: 'var(--admin-warning-bg)', color: 'var(--admin-warning)' }}><Clock size={20} /></div></div>
          <div className="stat-card-value">{counts.pending}</div>
          <div className="stat-card-label">Pending</div>
        </div>
        <div className="admin-stat-card" style={{ cursor: 'pointer', borderColor: filter === 'approved' ? 'var(--admin-success)' : undefined }} onClick={() => setFilter('approved')}>
          <div className="stat-card-header"><div className="stat-card-icon green"><CheckCircle size={20} /></div></div>
          <div className="stat-card-value">{counts.approved}</div>
          <div className="stat-card-label">Approved</div>
        </div>
        <div className="admin-stat-card" style={{ cursor: 'pointer', borderColor: filter === 'denied' ? 'var(--admin-danger)' : undefined }} onClick={() => setFilter('denied')}>
          <div className="stat-card-header"><div className="stat-card-icon red"><XCircle size={20} /></div></div>
          <div className="stat-card-value">{counts.denied}</div>
          <div className="stat-card-label">Denied</div>
        </div>
      </div>

      {/* Users Table */}
      {filteredUsers.length === 0 ? (
        <div className="admin-table-container">
          <div className="admin-empty-state">
            <div className="admin-empty-icon"><Users size={28} /></div>
            <h3>No {filter !== 'all' ? filter : ''} requests</h3>
            <p>{filter === 'all' ? 'No Shikhar access requests have been submitted yet.' : `No ${filter} requests found.`}</p>
          </div>
        </div>
      ) : (
        <div className="admin-table-container">
          <div className="admin-table-header">
            <h3>{filter === 'all' ? 'All' : filter.charAt(0).toUpperCase() + filter.slice(1)} Requests ({filteredUsers.length})</h3>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Requested On</th>
                <th>Last Attempt</th>
                <th>Status</th>
                <th>Sessions</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user._id}>
                  <td><div className="table-item-title">{user.name}</div></td>
                  <td style={{ color: 'var(--admin-text-muted)', fontSize: '0.8125rem' }}>{user.email}</td>
                  <td style={{ color: 'var(--admin-text-muted)', fontSize: '0.8125rem' }}>{user.phone || ' - '}</td>
                  <td style={{ color: 'var(--admin-text-muted)', fontSize: '0.8125rem' }}>{formatDate(user.createdAt)}</td>
                  <td style={{ color: 'var(--admin-text-muted)', fontSize: '0.8125rem' }}>{formatDate(user.lastLoginAttempt)}</td>
                  <td><span className={`admin-badge ${user.status}`}>{user.status.charAt(0).toUpperCase() + user.status.slice(1)}</span></td>
                  <td>
                    {user.status === 'approved' && (
                      <div style={{ display: 'flex', gap: '4px' }}>
                        {[1, 2, 3, 4, 5, 6].map(num => {
                          const isUnlocked = user.unlockedSessions?.includes(num);
                          return (
                            <button
                              key={num}
                              onClick={() => handleToggleSession(user._id, num, !!isUnlocked)}
                              title={isUnlocked ? `Lock Session ${num}` : `Unlock Session ${num}`}
                              style={{
                                width: '22px', height: '22px', borderRadius: '4px', border: '1px solid',
                                fontSize: '10px', fontWeight: 'bold', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                background: isUnlocked ? 'var(--admin-success-bg)' : 'transparent',
                                borderColor: isUnlocked ? 'var(--admin-success)' : 'var(--admin-border)',
                                color: isUnlocked ? 'var(--admin-success)' : 'var(--admin-text-muted)'
                              }}
                            >
                              {num}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </td>
                  <td>
                    <div className="admin-actions">
                      {user.status !== 'approved' && (
                        <button className="admin-action-btn success" onClick={() => handleApprove(user._id)} title="Approve"><Check size={14} /></button>
                      )}
                      {user.status !== 'denied' && (
                        <button className="admin-action-btn danger" onClick={() => handleDeny(user._id)} title="Deny"><X size={14} /></button>
                      )}
                      <button className="admin-action-btn danger" onClick={() => handleDelete(user._id)} title="Delete"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {toast.show && <div className={`admin-toast ${toast.type}`}><p>{toast.message}</p></div>}
    </div>
  );
};

export default AdminShikharUsers;
