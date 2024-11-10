// middleware/uploadMiddleware.js
const multer = require('multer');

// Configure multer for file uploads (temporary storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;
