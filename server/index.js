const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Ensure uploads directory exists (safely for serverless environments)
const uploadsDir = path.join(__dirname, 'uploads');
try {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
} catch (err) {
  console.warn('Could not create uploads directory (expected on Vercel read-only FS):', err.message);
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(uploadsDir));

// Connect to MongoDB
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function startDatabase() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error('❌ MONGODB_URI environment variable is missing.');
    throw new Error('MONGODB_URI is missing');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('⏳ Connecting to MongoDB...');
    mongoose.set('bufferCommands', false); // Globally disable buffering
    
    cached.promise = mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      bufferCommands: false, // Disable mongoose buffering to fail fast
      maxPoolSize: 10, // Serverless best practice
    }).then((mongoose) => {
      console.log('✅ Connected to MongoDB Atlas');
      return mongoose;
    }).catch(err => {
      console.error('❌ Failed to connect to MongoDB:', err.message);
      cached.promise = null;
      throw err;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    hasMongoUri: !!process.env.MONGODB_URI,
    envKeys: Object.keys(process.env).filter(k => k.includes('MONGO'))
  });
});

// Database Connection Middleware
// This ensures that serverless functions await the DB connection before handling the route
app.use(async (req, res, next) => {
  try {
    await startDatabase();
    next();
  } catch (error) {
    console.error('Database connection error in middleware:', error);
    res.status(503).json({ error: `Service Unavailable: Database connection failed. Details: ${error.message}` });
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

// Global Error Handler for Vercel (prevents returning HTML stack traces)
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: `Upload error: ${err.message}` });
  }
  res.status(500).json({ error: err.message || 'Internal Server Error' });
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
