const express = require('express');
const router = express.Router();
const supabase = require('../../supabase/supabase');
const upload = require('../middlewares/upload');

router.get('/load_image', async (req, res) => {
  const { data, error } = await supabase
    .storage
    .from('image-travel-app')  // Tên bucket của bạn
    .list('', { limit: 10 });   // Lấy tối đa 10 ảnh, có thể điều chỉnh limit

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  // Lấy URL cho các ảnh public (nếu bucket là public)
  const imageUrls = data.map(file => {
    return {
      name: file.name,
      url: `${process.env.SUPABASE_URL.replace(/\/$/, '')}/storage/v1/object/public/image-travel-app/${file.name}`,
    };
  });

  res.json(imageUrls); 
});

// router.post('/upload_images', upload.array('images'), async (req, res) => {
//   if (!req.files || req.files.length === 0) {
//     return res.status(400).json({ error: 'No files uploaded' });
//   }

//   const uploadedUrls = [];
//   const errors = [];

//   for (const file of req.files) {
//     const fileName = `${Date.now()}_${file.originalname}`;

//     const { data, error } = await supabase.storage
//       .from('image-travel-app')
//       .upload(fileName, file.buffer, {
//         contentType: file.mimetype,
//       });

//     if (error) {
//       errors.push({ file: file.originalname, message: error.message });
//     } else {
//       const publicUrl = `${process.env.SUPABASE_URL.replace(/\/$/, '')}/storage/v1/object/public/image-travel-app/${fileName}`;
//       uploadedUrls.push(publicUrl);
//     }
//   }

//   if (uploadedUrls.length === 0) {
//     return res.status(500).json({ error: 'Failed to upload all files', details: errors });
//   }

//   res.json({
//     urls: uploadedUrls,
//     errors: errors.length > 0 ? errors : undefined
//   });
// });

router.post('/upload_profile', upload.fields([
  { name: 'avata', maxCount: 1 },
  { name: 'background', maxCount: 1 }
]), async (req, res) => {
  const files = req.files;
  const result = {};
  const errors = [];

  // Hàm phụ để upload 1 ảnh và trả về public URL
  const uploadToSupabase = async (file) => {
    const fileName = `${Date.now()}_${file.originalname}`;
    const { data, error } = await supabase.storage
      .from('image-travel-app')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) {
      return { error: error.message };
    }

    const publicUrl = `${process.env.SUPABASE_URL.replace(/\/$/, '')}/storage/v1/object/public/image-travel-app/${fileName}`;
    return { url: publicUrl };
  };

  // Xử lý ảnh avata
  if (files.avata && files.avata.length > 0) {
    const { url, error } = await uploadToSupabase(files.avata[0]);
    if (error) {
      errors.push({ field: 'avata', message: error });
    } else {
      result.avata = url;
    }
  }

  // Xử lý ảnh background
  if (files.background && files.background.length > 0) {
    const { url, error } = await uploadToSupabase(files.background[0]);
    if (error) {
      errors.push({ field: 'background', message: error });
    } else {
      result.background = url;
    }
  }

  if (!result.avata && !result.background) {
    return res.status(400).json({ error: 'No valid files uploaded', details: errors });
  }

  res.json({
    ...result,
    errors: errors.length > 0 ? errors : undefined
  });
});

module.exports = router;
