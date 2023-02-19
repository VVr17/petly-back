import multer from 'multer';

const storage = multer.diskStorage({
  destination: "./assets",
  filename: function (req, file, cb) {
    cb(null, Math.random() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  switch (file.mimetype) {
    case 'image/jpeg':
      return cb(null, true); 
    case 'image/png':
      return cb(null, true); 
    case 'image/webp':
      return cb(null, true); 
    case 'image/apng':
      return cb(null, true); 
    case 'image/avif':
      return cb(null, true); 
    default:
      cb(null, false)
      break;
    };
  }
  
export const uploader = multer({
  storage,
  limits: {fileSize: 20000},
  fileFilter,
});
  
// export const fileUploadError = (res, err) => {
//   if (err instanceof multer.MulterError) {
//     return res.json({message: "Случилась ошибка Multer при загрузке."});
//     // Случилась ошибка Multer при загрузке.
//   } else if (err) {
//     // next(new createError(400, err.message));
//     return res.json({message: "При загрузке произошла неизвестная ошибка."});
//   }
// }