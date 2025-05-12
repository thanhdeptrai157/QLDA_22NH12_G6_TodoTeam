// middleware/upload.js
const multer = require('multer');
const path = require('path');

// Cấu hình nơi lưu file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // lưu ảnh vào thư mục uploads/
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

module.exports = upload;
