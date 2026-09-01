const express = require('express');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const StudyMaterial = require('../models/StudyMaterial');
const adminAuth = require('../middleware/proxyAuth');

const router = express.Router();

// Configure multer for memory storage (Vercel read-only filesystem fix)
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB for PDFs/docs
});

// GET /api/study-materials — public
router.get('/', async (req, res) => {
  try {
    const filter = req.query.all === 'true' ? {} : { published: true };
    const materials = await StudyMaterial.find(filter).select('-fileData').sort({ createdAt: -1 });
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
    const material = await StudyMaterial.findById(req.params.id).select('-fileData');
    if (!material) return res.status(404).json({ error: 'Study material not found' });
    res.json(material);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/study-materials/:id/download — public (Serves the actual file)
router.get('/:id/download', async (req, res) => {
  try {
    const material = await StudyMaterial.findById(req.params.id);
    if (!material || !material.fileData) return res.status(404).send('File not found');
    
    res.set('Content-Type', material.fileContentType || 'application/pdf');
    res.set('Content-Disposition', `inline; filename="${material.fileName}"`);
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.send(material.fileData);
  } catch (err) {
    res.status(500).send('Error downloading file');
  }
});

// POST /api/study-materials — admin only
router.post('/', adminAuth, upload.single('file'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.published === 'true') data.published = true;
    if (data.published === 'false') data.published = false;
    
    const material = new StudyMaterial(data);
    
    if (req.file) {
      material.fileData = req.file.buffer;
      material.fileContentType = req.file.mimetype;
      material.fileName = req.file.originalname;
      material.fileUrl = `/api/study-materials/${material._id}/download`;
    }
    
    await material.save();
    
    // Strip fileData before returning JSON
    const materialObj = material.toObject();
    delete materialObj.fileData;
    
    res.status(201).json(materialObj);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/study-materials/:id — admin only
router.put('/:id', adminAuth, upload.single('file'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.published === 'true') data.published = true;
    if (data.published === 'false') data.published = false;
    
    if (req.file) {
      data.fileData = req.file.buffer;
      data.fileContentType = req.file.mimetype;
      data.fileName = req.file.originalname;
      data.fileUrl = `/api/study-materials/${req.params.id}/download`;
    }
    
    const material = await StudyMaterial.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true }).select('-fileData');
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
