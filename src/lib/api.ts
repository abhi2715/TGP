const API_BASE = import.meta.env.VITE_API_URL || '/api';

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
  try {
    const res = await fetch(`${API_BASE}/blogs${all ? '?all=true' : ''}`);
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    return [];
  }
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
  try {
    const res = await fetch(`/api/study-materials${all ? '?all=true' : ''}`);
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    return [];
  }
}

export async function createStudyMaterial(formData: FormData) {
  const res = await fetch(`/api/study-materials`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: formData,
  });
  if (!res.ok) {
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const data = await res.json();
      throw new Error(data.error || 'Failed to create study material');
    } else {
      const text = await res.text();
      console.error("Non-JSON error response:", text);
      if (res.status === 413) throw new Error("File is too large for Vercel (4.5MB limit).");
      if (res.status === 504) throw new Error("Upload timed out. Vercel allows max 10 seconds for uploads.");
      throw new Error(`Server returned HTTP ${res.status}: ${res.statusText}`);
    }
  }
  return res.json();
}

export async function updateStudyMaterial(id: string, formData: FormData) {
  const res = await fetch(`/api/study-materials/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: formData,
  });
  if (!res.ok) {
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const data = await res.json();
      throw new Error(data.error || 'Failed to update study material');
    } else {
      if (res.status === 413) throw new Error("File is too large for Vercel (4.5MB limit).");
      if (res.status === 504) throw new Error("Upload timed out. Vercel allows max 10 seconds for uploads.");
      throw new Error(`Server returned HTTP ${res.status}: ${res.statusText}`);
    }
  }
  return res.json();
}

export async function deleteStudyMaterial(id: string) {
  const res = await fetch(`/api/study-materials/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const data = await res.json();
      throw new Error(data.error || 'Failed to delete study material');
    } else {
      throw new Error(`Server returned HTTP ${res.status}: ${res.statusText}`);
    }
  }
  return res.json();
}

// ── Testimonials ──

export async function fetchTestimonials(all = false) {
  try {
    const res = await fetch(`${API_BASE}/testimonials${all ? '?all=true' : ''}`);
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    return [];
  }
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

export async function requestShikharAccess(data: { name: string; email: string; phone?: string; password?: string }) {
  const res = await fetch(`${API_BASE}/shikhar-users/request`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Failed to submit access request');
  }
  return res.json();
}

export async function loginShikhar(email: string, password?: string) {
  const res = await fetch(`${API_BASE}/shikhar-users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Login failed');
  }
  return res.json();
}

export async function verifyShikharSession(email: string, sessionToken: string) {
  const res = await fetch(`${API_BASE}/shikhar-users/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, sessionToken }),
  });
  if (!res.ok) return { valid: false };
  return res.json();
}

export async function syncShikharState(email: string, sessionToken: string, state: any) {
  const res = await fetch(`${API_BASE}/shikhar-users/sync-state`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, sessionToken, state }),
  });
  if (!res.ok) throw new Error('Failed to sync state');
  return res.json();
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
    body: JSON.stringify({})
  });
  if (!res.ok) throw new Error('Failed to approve user');
  return res.json();
}

export async function denyShikharUser(id: string) {
  const res = await fetch(`${API_BASE}/shikhar-users/${id}/deny`, {
    method: 'PUT',
    headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify({})
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
    body: JSON.stringify({})
  });
  if (!res.ok) throw new Error('Failed to delete user');
  return res.json();
}
