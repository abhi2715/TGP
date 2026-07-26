const express = require('express');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const Blog = require('../models/Blog');
const adminAuth = require('../middleware/auth');

const router = express.Router();

// Configure multer for blog cover images
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `blog-${uuidv4()}${ext}`);
  }
});
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
    const blogs = await Blog.find(filter).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/blogs/:id — public, get single blog
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/blogs — admin only, create blog
router.post('/', adminAuth, upload.single('coverImage'), async (req, res) => {
  try {
    const blogData = { ...req.body };
    if (req.file) {
      blogData.coverImage = `/uploads/${req.file.filename}`;
    }
    if (blogData.published === 'true') blogData.published = true;
    if (blogData.published === 'false') blogData.published = false;
    
    const blog = new Blog(blogData);
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/blogs/:id — admin only, update blog
router.put('/:id', adminAuth, upload.single('coverImage'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.coverImage = `/uploads/${req.file.filename}`;
    }
    if (updateData.published === 'true') updateData.published = true;
    if (updateData.published === 'false') updateData.published = false;
    
    const blog = await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
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
