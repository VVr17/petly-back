import * as dotenv from "dotenv";
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

console.log("Cloudinary configured successfully");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "avatars",
  // allowedFormats: ["jpg", "png"],
  filename: (req, file, cb) => {
    console.log("Setting filename to:", file.originalname);
    cb(null, file.originalname);
  },
});

export const uploadCloud = multer({ storage });

// export const uploader = multer({
//   storage,
//   limits: {fileSize: 20000},
//   fileFilter,
// });
