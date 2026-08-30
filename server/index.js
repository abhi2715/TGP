const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(uploadsDir));

// Routes
const adminRoutes = require('./routes/admin');
const blogRoutes = require('./routes/blogs');
const studyMaterialRoutes = require('./routes/studyMaterials');
const testimonialRoutes = require('./routes/testimonials');
const shikharUserRoutes = require('./routes/shikharUsers');

app.use('/api/admin', adminRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/study-materials', studyMaterialRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/shikhar-users', shikharUserRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Connect to MongoDB
async function startDatabase() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error('❌ MONGODB_URI environment variable is missing.');
    console.error('💡 Please configure it in your Vercel Dashboard (Settings > Environment Variables) or local .env file.');
    if (!process.env.VERCEL) {
      process.exit(1);
    }
    return;
  }

  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
      console.log('✅ Connected to MongoDB Atlas');
    }
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB:', err.message);
    if (!process.env.VERCEL) {
      process.exit(1);
    }
  }
}

// Ensure database connects (for Vercel it connects lazily or on boot)
startDatabase();

// If not running in Vercel, start the listener
if (!process.env.VERCEL) {
  app.listen(PORT, '127.0.0.1', () => {
    console.log(`🚀 Server running on http://127.0.0.1:${PORT}`);
    console.log(`📁 Uploads served from ${uploadsDir}`);
  });
}

// Export the app for Vercel Serverless Functions
module.exports = app;
