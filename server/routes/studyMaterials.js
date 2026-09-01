const express = require('express');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const StudyMaterial = require('../models/StudyMaterial');
const adminAuth = require('../middleware/auth');

const router = express.Router();

// Configure multer for study material files
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `material-${uuidv4()}${ext}`);
  }
});
const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB for PDFs/docs
});

// GET /api/study-materials — public
router.get('/', async (req, res) => {
  try {
    const filter = req.query.all === 'true' ? {} : { published: true };
    const materials = await StudyMaterial.find(filter).sort({ createdAt: -1 });
    // Cache on Vercel CDN for 60 seconds, serve stale while revalidating for 24h
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=86400');
    res.json(materials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/study-materials/:id — public
router.get('/:id', async (req, res) => {
  try {
    const material = await StudyMaterial.findById(req.params.id);
    if (!material) return res.status(404).json({ error: 'Study material not found' });
    res.json(material);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/study-materials — admin only
router.post('/', adminAuth, upload.single('file'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.fileUrl = `/uploads/${req.file.filename}`;
      data.fileName = req.file.originalname;
    }
    if (data.published === 'true') data.published = true;
    if (data.published === 'false') data.published = false;
    
    const material = new StudyMaterial(data);
    await material.save();
    res.status(201).json(material);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/study-materials/:id — admin only
router.put('/:id', adminAuth, upload.single('file'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.fileUrl = `/uploads/${req.file.filename}`;
      data.fileName = req.file.originalname;
    }
    if (data.published === 'true') data.published = true;
    if (data.published === 'false') data.published = false;
    
    const material = await StudyMaterial.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!material) return res.status(404).json({ error: 'Study material not found' });
    res.json(material);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/study-materials/:id — admin only
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const material = await StudyMaterial.findByIdAndDelete(req.params.id);
    if (!material) return res.status(404).json({ error: 'Study material not found' });
    res.json({ message: 'Study material deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
