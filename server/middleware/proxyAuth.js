/**
 * Proxy Auth Middleware
 * 
 * This middleware verifies admin tokens by calling the primary backend
 * (tgp-backend-khaki) instead of decoding them locally.
 * 
 * Why: The admin login happens on tgp-backend-khaki which signs tokens
 * with its own JWT_SECRET. This backend (tgp-frontend-eight) doesn't
 * share that secret, so it can't verify tokens locally. Instead, we
 * forward the token to the primary backend's /api/admin/verify endpoint.
 */

const BACKEND_URL = process.env.VITE_API_URL || 'https://tgp-backend-khaki.vercel.app/api';

const proxyAdminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    // Call the primary backend to verify the token
    const verifyRes = await fetch(`${BACKEND_URL}/admin/verify`, {
      method: 'GET',
      headers: { 'Authorization': authHeader },
    });

    if (!verifyRes.ok) {
      return res.status(401).json({ error: 'Invalid or expired token.' });
    }

    const data = await verifyRes.json();
    if (!data.valid) {
      return res.status(403).json({ error: 'Access denied. Admin only.' });
    }

    req.admin = { email: data.email, isAdmin: true };
    next();
  } catch (err) {
    console.error('Proxy auth error:', err.message);
    return res.status(500).json({ error: 'Authentication service unavailable.' });
  }
};

module.exports = proxyAdminAuth;
