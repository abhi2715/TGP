const app = require('../server/index');

// Disable Vercel's default body parser to prevent it from consuming the stream
// or crashing on large multipart/form-data payloads before multer can handle it.
app.config = {
  api: {
    bodyParser: false,
  },
};

module.exports = app;
