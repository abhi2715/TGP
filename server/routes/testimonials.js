const express = require('express');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const Testimonial = require('../models/Testimonial');
const adminAuth = require('../middleware/auth');

const router = express.Router();

// Configure multer for memory storage (Vercel read-only filesystem fix)
const storage = multer.memoryStorage();
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
    const testimonials = await Testimonial.find(filter).select('-imageData').sort({ createdAt: -1 });
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
    const testimonial = await Testimonial.findById(req.params.id).select('-imageData');
    if (!testimonial) return res.status(404).json({ error: 'Testimonial not found' });
    res.json(testimonial);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/testimonials/:id/image — public (Serves the actual image)
router.get('/:id/image', async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial || !testimonial.imageData) return res.status(404).send('Image not found');
    
    res.set('Content-Type', testimonial.imageContentType || 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.send(testimonial.imageData);
  } catch (err) {
    res.status(500).send('Error downloading image');
  }
});

// POST /api/testimonials — admin only
router.post('/', adminAuth, upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.published === 'true') data.published = true;
    if (data.published === 'false') data.published = false;
    
    const testimonial = new Testimonial(data);
    
    if (req.file) {
      testimonial.imageData = req.file.buffer;
      testimonial.imageContentType = req.file.mimetype;
      testimonial.image = `/api/testimonials/${testimonial._id}/image`;
    }
    
    await testimonial.save();
    
    const testimonialObj = testimonial.toObject();
    delete testimonialObj.imageData;
    
    res.status(201).json(testimonialObj);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/testimonials/:id — admin only
router.put('/:id', adminAuth, upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.published === 'true') data.published = true;
    if (data.published === 'false') data.published = false;
    
    if (req.file) {
      data.imageData = req.file.buffer;
      data.imageContentType = req.file.mimetype;
      data.image = `/api/testimonials/${req.params.id}/image`;
    }
    
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true }).select('-imageData');
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
