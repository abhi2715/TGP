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

const https = require('https');

const BACKEND_URL = 'https://tgp-backend-khaki.vercel.app/api';

function verifyTokenViaBackend(authHeader) {
  return new Promise((resolve, reject) => {
    const url = new URL(`${BACKEND_URL}/admin/verify`);
    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'GET',
      headers: {
        'Authorization': authHeader,
      },
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

    const result = await verifyTokenViaBackend(authHeader);

    if (result.status !== 200 || !result.data.valid) {
      return res.status(401).json({ error: 'Invalid or expired token.' });
    }

    req.admin = { email: result.data.email, isAdmin: true };
    next();
  } catch (err) {
    console.error('Proxy auth error:', err.message);
    return res.status(500).json({ error: 'Authentication service unavailable: ' + err.message });
  }
};

module.exports = proxyAdminAuth;
