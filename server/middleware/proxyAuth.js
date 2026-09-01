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
        console.log('ProxyAuth: Strategy 1 (Local) SUCCEEDED');
        req.admin = decoded;
        return next();
      }
    } catch (localErr) {
      console.log('ProxyAuth: Strategy 1 (Local) FAILED -', localErr.message);
    }

    // Strategy 2: Proxy to khaki backend (works on Vercel production)
    try {
      console.log(`ProxyAuth: Proxying verification to ${BACKEND_URL}/admin/verify`);
      const result = await verifyTokenViaBackend(authHeader);
      console.log(`ProxyAuth: Strategy 2 (Proxy) Result: Status=${result.status}, Valid=${result.data?.valid}`);
      if (result.status === 200 && result.data && result.data.valid) {
        console.log('ProxyAuth: Strategy 2 (Proxy) SUCCEEDED');
        req.admin = { email: result.data.email, isAdmin: true };
        return next();
      }
      return res.status(401).json({ error: `Khaki Backend rejected token: HTTP ${result.status} - ${JSON.stringify(result.data)}` });
    } catch (proxyErr) {
      console.log('ProxyAuth: Strategy 2 (Proxy) FAILED -', proxyErr.message);
      return res.status(401).json({ error: `Proxy Error: ${proxyErr.message}` });
    }
  } catch (err) {
    console.error('Auth middleware error:', err.message);
    return res.status(500).json({ error: 'Authentication error: ' + err.message });
  }
};

module.exports = proxyAdminAuth;
