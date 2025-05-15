// middleware/upload.js
const multer = require('multer');
const storage = multer.memoryStorage(); // để upload lên Supabase trực tiếp từ bộ nhớ
const upload = multer({ storage });

module.exports = upload;
