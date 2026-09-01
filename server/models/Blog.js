const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, default: 'Dr. Pooja Sharma' },
  coverImage: { type: String, default: '' },
  imageData: { type: Buffer },
  imageContentType: { type: String },
  readTime: { type: String, default: '5 min read' },
  published: { type: Boolean, default: true },
}, { timestamps: true });

// Auto-generate slug from title
blogSchema.pre('validate', function(next) {
  if (this.title && !this.slug) {
    let generatedSlug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
      
    // Fallback if title contains no English alphanumeric characters (e.g., Hindi, Emojis)
    if (!generatedSlug) {
      generatedSlug = 'blog-' + Date.now();
    }
    this.slug = generatedSlug;
  }
  next();
});

module.exports = mongoose.model('Blog', blogSchema);
