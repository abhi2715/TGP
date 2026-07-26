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

// Connect to MongoDB — try configured URI first, fall back to in-memory server
async function startServer() {
  let mongoUri = process.env.MONGODB_URI;
  let usingMemory = false;

  try {
    // First, try connecting to the configured URI
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 3000 });
    console.log('✅ Connected to MongoDB at', mongoUri);
  } catch (err) {
    // Fall back to in-memory MongoDB server
    console.log('⚠️  Could not connect to MongoDB at', mongoUri);
    console.log('📦 Starting in-memory MongoDB server for development...');
    
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      mongoUri = mongod.getUri();
      await mongoose.connect(mongoUri);
      usingMemory = true;
      console.log('✅ Connected to in-memory MongoDB');
      console.log('⚠️  Data will be lost when the server stops. Use a real MongoDB for persistence.');
    } catch (memErr) {
      console.error('❌ Failed to start in-memory MongoDB:', memErr.message);
      process.exit(1);
    }
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📁 Uploads served from ${uploadsDir}`);
    if (usingMemory) {
      console.log('💡 To persist data, install MongoDB locally or set MONGODB_URI to a MongoDB Atlas connection string in server/.env');
    }
  });
}

startServer();
