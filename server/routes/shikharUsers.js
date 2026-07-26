const express = require('express');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const ShikharUser = require('../models/ShikharUser');
const adminAuth = require('../middleware/auth');

const router = express.Router();

// POST /api/shikhar-users/request — public, submit access request
router.post('/request', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    // Check if user already submitted a request
    let user = await ShikharUser.findOne({ email: email.toLowerCase() });
    
    if (user) {
      return res.status(400).json({ error: 'An account or request with this email already exists. Please log in or wait for approval.' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new access request
    user = new ShikharUser({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone: phone || '',
      status: 'pending',
      lastLoginAttempt: new Date(),
    });
    await user.save();

    res.status(201).json({ 
      status: 'pending', 
      message: 'Access request submitted! You will be notified once approved by the admin.' 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/shikhar-users/login — check if user is approved and can access
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

    const user = await ShikharUser.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ error: 'No access request found. Please request access first.' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      user.lastLoginAttempt = new Date();
      await user.save();
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    user.lastLoginAttempt = new Date();

    if (user.status === 'approved') {
      // Generate a new session token, enforcing single device login by overwriting the old one
      const sessionToken = uuidv4();
      user.sessionToken = sessionToken;
      await user.save();

      return res.json({ 
        status: 'approved', 
        user: { name: user.name, email: user.email },
        sessionToken
      });
    }
    
    await user.save();
    return res.json({ status: user.status, message: user.status === 'pending' ? 'Your request is still pending.' : 'Access denied.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/shikhar-users/verify — check if session is valid
router.post('/verify', async (req, res) => {
  try {
    const { email, sessionToken } = req.body;
    if (!email || !sessionToken) return res.status(400).json({ valid: false });

    const user = await ShikharUser.findOne({ email: email.toLowerCase(), sessionToken });
    if (user && user.status === 'approved') {
      return res.json({ valid: true });
    }
    return res.json({ valid: false });
  } catch (err) {
    res.status(500).json({ valid: false });
  }
});

// POST /api/shikhar-users/logout — end session
router.post('/logout', async (req, res) => {
  try {
    const { email, sessionToken } = req.body;
    if (email && sessionToken) {
      const user = await ShikharUser.findOne({ email: email.toLowerCase(), sessionToken });
      if (user) {
        user.sessionToken = '';
        await user.save();
      }
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// GET /api/shikhar-users — admin only, list all
router.get('/', adminAuth, async (req, res) => {
  try {
    const users = await ShikharUser.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/shikhar-users/stats — admin only, get counts
router.get('/stats', adminAuth, async (req, res) => {
  try {
    const total = await ShikharUser.countDocuments();
    const pending = await ShikharUser.countDocuments({ status: 'pending' });
    const approved = await ShikharUser.countDocuments({ status: 'approved' });
    const denied = await ShikharUser.countDocuments({ status: 'denied' });
    res.json({ total, pending, approved, denied });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/shikhar-users/:id/approve — admin only
router.put('/:id/approve', adminAuth, async (req, res) => {
  try {
    const user = await ShikharUser.findByIdAndUpdate(
      req.params.id,
      { status: 'approved', notes: req.body.notes || '' },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/shikhar-users/:id/deny — admin only
router.put('/:id/deny', adminAuth, async (req, res) => {
  try {
    const user = await ShikharUser.findByIdAndUpdate(
      req.params.id,
      { status: 'denied', notes: req.body.notes || '' },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/shikhar-users/:id — admin only
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const user = await ShikharUser.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
