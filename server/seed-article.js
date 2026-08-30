const mongoose = require('mongoose');
require('dotenv').config();
const StudyMaterial = require('./models/StudyMaterial');
const Blog = require('./models/Blog');

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to DB');
    
    // Check if it already exists
    const existing = await StudyMaterial.findOne({ title: 'The Hidden Beliefs That Hold Leaders Back' });
    if (!existing) {
      const article = new StudyMaterial({
        title: 'The Hidden Beliefs That Hold Leaders Back',
        description: 'An insightful Harvard Business Review article by Muriel M. Wilkins on recognizing and overcoming unproductive beliefs that hinder leadership potential.',
        category: 'Leadership',
        type: 'Article', // we can use Article
        fileUrl: '/pdfs/hidden-beliefs-leaders.pdf',
        fileName: 'hidden-beliefs-leaders.pdf',
        coverImage: '/leadership_books_compass.png', // Add this to the schema if needed, or just let it be
      });
      await article.save();
      console.log('Article seeded!');
    } else {
      console.log('Article already exists.');
    }
    
    mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    mongoose.disconnect();
  });
