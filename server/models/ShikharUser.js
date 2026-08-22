const mongoose = require('mongoose');

const shikharUserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, default: '' },
  status: { type: String, enum: ['pending', 'approved', 'denied'], default: 'pending' },
  accessCode: { type: String, default: '' },
  sessionToken: { type: String, default: '' },
  notes: { type: String, default: '' },
  shikharState: { type: mongoose.Schema.Types.Mixed, default: {} },
  unlockedSessions: { type: [Number], default: [1] },
  lastLoginAttempt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('ShikharUser', shikharUserSchema);
