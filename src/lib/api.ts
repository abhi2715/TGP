const API_BASE = '/api';

export async function adminLogin(email: string, password: string) {
  const res = await fetch(`${API_BASE}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Login failed');
  }
  return res.json();
}

export async function verifyAdminToken(token: string) {
  const res = await fetch(`${API_BASE}/admin/verify`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return false;
  const data = await res.json();
  return data.valid;
}

function getAuthHeaders() {
  const token = localStorage.getItem('tgp_admin_token');
  return {
    Authorization: `Bearer ${token}`,
  };
}

// ── Blogs ──

export async function fetchBlogs(all = false) {
  const res = await fetch(`${API_BASE}/blogs${all ? '?all=true' : ''}`);
  if (!res.ok) throw new Error('Failed to fetch blogs');
  return res.json();
}

export async function fetchBlog(id: string) {
  const res = await fetch(`${API_BASE}/blogs/${id}`);
  if (!res.ok) throw new Error('Failed to fetch blog');
  return res.json();
}

export async function createBlog(formData: FormData) {
  const res = await fetch(`${API_BASE}/blogs`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: formData,
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Failed to create blog');
  }
  return res.json();
}

export async function updateBlog(id: string, formData: FormData) {
  const res = await fetch(`${API_BASE}/blogs/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: formData,
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Failed to update blog');
  }
  return res.json();
}

export async function deleteBlog(id: string) {
  const res = await fetch(`${API_BASE}/blogs/${id}`, {
    method: 'DELETE',
    headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Failed to delete blog');
  return res.json();
}

// ── Study Materials ──

export async function fetchStudyMaterials(all = false) {
  const res = await fetch(`${API_BASE}/study-materials${all ? '?all=true' : ''}`);
  if (!res.ok) throw new Error('Failed to fetch study materials');
  return res.json();
}

export async function createStudyMaterial(formData: FormData) {
  const res = await fetch(`${API_BASE}/study-materials`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: formData,
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Failed to create study material');
  }
  return res.json();
}

export async function updateStudyMaterial(id: string, formData: FormData) {
  const res = await fetch(`${API_BASE}/study-materials/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: formData,
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Failed to update study material');
  }
  return res.json();
}

export async function deleteStudyMaterial(id: string) {
  const res = await fetch(`${API_BASE}/study-materials/${id}`, {
    method: 'DELETE',
    headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Failed to delete study material');
  return res.json();
}

// ── Testimonials ──

export async function fetchTestimonials(all = false) {
  const res = await fetch(`${API_BASE}/testimonials${all ? '?all=true' : ''}`);
  if (!res.ok) throw new Error('Failed to fetch testimonials');
  return res.json();
}

export async function createTestimonial(formData: FormData) {
  const res = await fetch(`${API_BASE}/testimonials`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: formData,
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Failed to create testimonial');
  }
  return res.json();
}

export async function updateTestimonial(id: string, formData: FormData) {
  const res = await fetch(`${API_BASE}/testimonials/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: formData,
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Failed to update testimonial');
  }
  return res.json();
}

export async function deleteTestimonial(id: string) {
  const res = await fetch(`${API_BASE}/testimonials/${id}`, {
    method: 'DELETE',
    headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Failed to delete testimonial');
  return res.json();
}

// ── Shikhar Users ──

export async function fetchShikharUsers() {
  const res = await fetch(`${API_BASE}/shikhar-users`, {
    headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Failed to fetch shikhar users');
  return res.json();
}

export async function fetchShikharStats() {
  const res = await fetch(`${API_BASE}/shikhar-users/stats`, {
    headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
}

export async function requestShikharAccess(_data: { name: string; email: string; phone?: string; password?: string }): Promise<{ status: string; sessionToken?: string; message?: string; user?: { name: string; email: string }; shikharState?: any; unlockedSessions?: number[] }> {
  // BYPASS: Mock approved response for frontend-only mode
  return { status: 'approved', sessionToken: 'mock-token-123', message: 'Access granted instantly' };
}

export async function loginShikhar(email: string, _password?: string): Promise<{ status: string; sessionToken?: string; error?: string; user?: { name: string; email: string }; shikharState?: any; unlockedSessions?: number[] }> {
  // BYPASS: Mock login response
  return { 
    status: 'approved', 
    sessionToken: 'mock-token-123',
    user: { 
      name: email.split('@')[0].split(/[\.\-\_]/).map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()).join(' ') || 'Leader', 
      email 
    },
    unlockedSessions: [1] // Ensure only session 1 is unlocked initially in bypass mode
  };
}

export async function verifyShikharSession(_email: string, sessionToken: string): Promise<{ valid: boolean; user?: { name: string; email: string }; shikharState?: any; unlockedSessions?: number[] }> {
  // BYPASS: Always return valid for mock token
  return { valid: sessionToken === 'mock-token-123' };
}

export async function syncShikharState(_email: string, _sessionToken: string, _state: any) {
  // BYPASS: Do nothing, relies on localStorage
  return true;
}

export async function logoutShikhar(email: string, sessionToken: string) {
  const res = await fetch(`${API_BASE}/shikhar-users/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, sessionToken }),
  });
  return res.json();
}

export async function approveShikharUser(id: string) {
  const res = await fetch(`${API_BASE}/shikhar-users/${id}/approve`, {
    method: 'PUT',
    headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Failed to approve user');
  return res.json();
}

export async function denyShikharUser(id: string) {
  const res = await fetch(`${API_BASE}/shikhar-users/${id}/deny`, {
    method: 'PUT',
    headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Failed to deny user');
  return res.json();
}

export async function toggleUserSessionUnlock(id: string, sessionId: number, unlocked: boolean) {
  const res = await fetch(`${API_BASE}/shikhar-users/${id}/unlock-session`, {
    method: 'PUT',
    headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, unlocked })
  });
  if (!res.ok) throw new Error('Failed to toggle session unlock');
  return res.json();
}

export async function deleteShikharUser(id: string) {
  const res = await fetch(`${API_BASE}/shikhar-users/${id}`, {
    method: 'DELETE',
    headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Failed to delete user');
  return res.json();
}
