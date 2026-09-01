/**
 * Hybrid Auth Middleware
 * 
 * Works in BOTH environments:
 * - LOCAL: Verifies JWT directly using the local JWT_SECRET (from server/.env)
 * - VERCEL: Proxies verification to tgp-backend-khaki (which issued the token)
 */

const jwt = require('jsonwebtoken');
const https = require('https');

const BACKEND_URL = 'https://tgp-backend-khaki.vercel.app/api';

function verifyTokenViaBackend(authHeader) {
  return new Promise((resolve, reject) => {
    const url = new URL(`${BACKEND_URL}/admin/verify`);
    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'GET',
      headers: { 'Authorization': authHeader },
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        try {
          const data = JSON.parse(body);
          resolve({ status: res.statusCode, data });
        } catch (e) {
          reject(new Error('Invalid JSON from verify endpoint'));
        }
      });
    });

    req.on('error', (err) => reject(err));
    req.setTimeout(8000, () => {
      req.destroy();
      reject(new Error('Verify request timed out'));
    });
    req.end();
  });
}

const proxyAdminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];

    // Strategy 1: Try local JWT verification first (works in local dev)
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.isAdmin) {
        req.admin = decoded;
        return next();
      }
    } catch (_localErr) {
      // Local verification failed — token was signed by a different backend
    }

    // Strategy 2: Proxy to khaki backend (works on Vercel production)
    try {
      const result = await verifyTokenViaBackend(authHeader);
      if (result.status === 200 && result.data.valid) {
        req.admin = { email: result.data.email, isAdmin: true };
        return next();
      }
    } catch (proxyErr) {
      console.error('Proxy auth fallback failed:', proxyErr.message);
    }

    // Both strategies failed
    return res.status(401).json({ error: 'Invalid or expired token.' });
  } catch (err) {
    console.error('Auth middleware error:', err.message);
    return res.status(500).json({ error: 'Authentication error: ' + err.message });
  }
};

module.exports = proxyAdminAuth;
