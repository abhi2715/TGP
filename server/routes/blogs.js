const express = require('express');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const Blog = require('../models/Blog');
const adminAuth = require('../middleware/auth');

const router = express.Router();

// Configure multer for memory storage (Vercel read-only filesystem fix)
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    const valid = allowed.test(path.extname(file.originalname).toLowerCase());
    cb(valid ? null : new Error('Only image files allowed'), valid);
  }
});

// GET /api/blogs — public, list all published blogs
router.get('/', async (req, res) => {
  try {
    const filter = req.query.all === 'true' ? {} : { published: true };
    const blogs = await Blog.find(filter).select('-imageData').sort({ createdAt: -1 });
    // Cache on Vercel CDN for 60 seconds, serve stale while revalidating for 24h
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=86400');
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/blogs/:id — public, get single blog
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).select('-imageData');
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/blogs/:id/image — public (Serves the actual image)
router.get('/:id/image', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog || !blog.imageData) return res.status(404).send('Image not found');
    
    res.set('Content-Type', blog.imageContentType || 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.send(blog.imageData);
  } catch (err) {
    res.status(500).send('Error downloading image');
  }
});

// POST /api/blogs — admin only, create blog
router.post('/', adminAuth, upload.single('coverImage'), async (req, res) => {
  try {
    const blogData = { ...req.body };
    if (blogData.published === 'true') blogData.published = true;
    if (blogData.published === 'false') blogData.published = false;
    
    const blog = new Blog(blogData);
    
    if (req.file) {
      blog.imageData = req.file.buffer;
      blog.imageContentType = req.file.mimetype;
      blog.coverImage = `/api/blogs/${blog._id}/image`;
    }
    
    await blog.save();
    
    const blogObj = blog.toObject();
    delete blogObj.imageData;
    
    res.status(201).json(blogObj);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/blogs/:id — admin only, update blog
router.put('/:id', adminAuth, upload.single('coverImage'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (updateData.published === 'true') updateData.published = true;
    if (updateData.published === 'false') updateData.published = false;
    
    if (req.file) {
      updateData.imageData = req.file.buffer;
      updateData.imageContentType = req.file.mimetype;
      updateData.coverImage = `/api/blogs/${req.params.id}/image`;
    }
    
    const blog = await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true }).select('-imageData');
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/blogs/:id — admin only
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
