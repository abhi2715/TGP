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

// Connect to MongoDB
let cachedConnection = null;

async function startDatabase() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error('❌ MONGODB_URI environment variable is missing.');
    throw new Error('MONGODB_URI is missing');
  }

  // If already connected, return
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // If a connection is already in progress, wait for it
  if (mongoose.connection.readyState === 2) {
    return new Promise(resolve => {
      mongoose.connection.once('connected', () => resolve(mongoose.connection));
    });
  }

  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    console.log('⏳ Connecting to MongoDB...');
    cachedConnection = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      bufferCommands: false // Disable mongoose buffering to fail fast instead of hanging
    });
    console.log('✅ Connected to MongoDB');
    return cachedConnection;
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB:', err.message);
    cachedConnection = null;
    throw err;
  }
}

// Database Connection Middleware
// This ensures that serverless functions await the DB connection before handling the route
app.use(async (req, res, next) => {
  try {
    await startDatabase();
    next();
  } catch (error) {
    console.error('Database connection error in middleware:', error);
    res.status(503).json({ error: 'Service Unavailable: Database connection failed' });
  }
});

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

// If not running in Vercel, start the listener
if (!process.env.VERCEL) {
  startDatabase().then(() => {
    app.listen(PORT, '127.0.0.1', () => {
      console.log(`🚀 Server running on http://127.0.0.1:${PORT}`);
      console.log(`📁 Uploads served from ${uploadsDir}`);
    });
  }).catch(err => {
    console.error('Failed to start server due to DB error', err);
    process.exit(1);
  });
}

// Export the app for Vercel Serverless Functions
module.exports = app;
