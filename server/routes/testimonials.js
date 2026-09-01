const express = require('express');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const Testimonial = require('../models/Testimonial');
const adminAuth = require('../middleware/auth');

const router = express.Router();

// Configure multer for testimonial images
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `testimonial-${uuidv4()}${ext}`);
  }
});
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    const valid = allowed.test(path.extname(file.originalname).toLowerCase());
    cb(valid ? null : new Error('Only image files allowed'), valid);
  }
});

// GET /api/testimonials — public
router.get('/', async (req, res) => {
  try {
    const filter = req.query.all === 'true' ? {} : { published: true };
    const testimonials = await Testimonial.find(filter).sort({ createdAt: -1 });
    // Cache on Vercel CDN for 60 seconds, serve stale while revalidating for 24h
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=86400');
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/testimonials/:id — public
router.get('/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).json({ error: 'Testimonial not found' });
    res.json(testimonial);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/testimonials — admin only
router.post('/', adminAuth, upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.image = `/uploads/${req.file.filename}`;
    }
    if (data.published === 'true') data.published = true;
    if (data.published === 'false') data.published = false;
    
    const testimonial = new Testimonial(data);
    await testimonial.save();
    res.status(201).json(testimonial);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/testimonials/:id — admin only
router.put('/:id', adminAuth, upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.image = `/uploads/${req.file.filename}`;
    }
    if (data.published === 'true') data.published = true;
    if (data.published === 'false') data.published = false;
    
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!testimonial) return res.status(404).json({ error: 'Testimonial not found' });
    res.json(testimonial);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/testimonials/:id — admin only
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) return res.status(404).json({ error: 'Testimonial not found' });
    res.json({ message: 'Testimonial deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
