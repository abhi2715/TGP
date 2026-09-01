const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  company: { type: String, default: '' },
  quote: { type: String, required: true },
  metric: { type: String, default: '' },
  image: { type: String, default: '' },
  imageData: { type: Buffer },
  imageContentType: { type: String },
  videoUrl: { type: String, default: '' },
  published: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);
