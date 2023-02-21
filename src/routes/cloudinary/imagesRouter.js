import express from "express";
// import { uploader}  from "../../middlewares/multerUpload.js";
import { errorWrapper } from "../../helpers/errorWrapper.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { addImageController } from "../../controllers/images/addImageToCloudinary.js";

const imagesRouter = new express.Router();

// imagesRouter.post("/user", authMiddleware, uploader.single("avatar"), errorWrapper(addImageController));
// imagesRouter.post("/pet", authMiddleware, uploader.single("petImage"), errorWrapper(addImageController));

export default imagesRouter;
