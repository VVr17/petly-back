import cloudinary from "cloudinary";
import { setSuccessResponse } from "../../helpers/setResponse.js";
import fs from "fs/promises";

export const addImageController = async (req, res) => {
  const Path = req.file.path;
  const upload = await cloudinary.uploader.upload(Path);
  await fs.unlink(Path);

  return res.json(setSuccessResponse(200, {photoURL: upload.secure_url}));
}

