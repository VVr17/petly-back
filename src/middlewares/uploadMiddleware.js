import * as dotenv from "dotenv";
// import cloudinary from "cloudinary";

import { v2 as cloudinary } from "cloudinary";
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
  allowedFormats: ["jpg", "png"],
  filename: (req, file, cb) => {
    console.log("Setting filename to:", file.originalname);
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  switch (file.mimetype) {
    case "image/jpeg":
      return cb(null, true);
    case "image/png":
      return cb(null, true);
    case "image/webp":
      return cb(null, true);
    case "image/apng":
      return cb(null, true);
    case "image/avif":
      return cb(null, true);
    default:
      cb(null, false);
      break;
  }
};

export const uploadCloud = multer({
  storage,
  // limits: { fileSize: 20000 },
  fileFilter,
});
