const mongoose = require('mongoose');

const studyMaterialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  type: { type: String, enum: ['Article', 'Worksheet', 'Toolkit', 'Template', 'Assessment', 'Guide', 'eBook'], default: 'Article' },
  fileUrl: { type: String, default: '' },
  fileName: { type: String, default: '' },
  fileData: { type: Buffer },
  fileContentType: { type: String },
  coverImage: { type: String, default: '' },
  readTime: { type: String, default: '' },
  published: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('StudyMaterial', studyMaterialSchema);
