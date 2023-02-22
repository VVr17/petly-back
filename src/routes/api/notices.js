import express from "express";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { errorWrapper } from "../../helpers/errorWrapper.js";
import {
  getByCategoryController,
  getByIdController,
  addToFavoriteController,
  getFavoritesController,
  removeFromFavoritesController,
  addNoticeController,
  removeNoticeController,
  getUserNoticesController,
} from "../../controllers/notices/index.js";
import { validateNoticeBody } from "../../middlewares/validateNoticeBody.js";
import { uploadCloud } from "../../middlewares/uploadMiddleware.js";

const router = new express.Router();

router.get("/user", authMiddleware, errorWrapper(getUserNoticesController));

router.get("/id/:noticeId", errorWrapper(getByIdController));
router.delete(
  "/id/:noticeId",
  authMiddleware,
  errorWrapper(removeNoticeController)
);

router.post(
  "/favorites/:noticeId",
  authMiddleware,
  errorWrapper(addToFavoriteController)
);
router.get("/favorites", authMiddleware, errorWrapper(getFavoritesController));
router.delete(
  "/favorites/:noticeId",
  authMiddleware,
  errorWrapper(removeFromFavoritesController)
);

router.get("/category/:categoryName", errorWrapper(getByCategoryController));
router.post(
  "/category/:categoryName",
  [authMiddleware, uploadCloud.single("petImage"), validateNoticeBody],
  errorWrapper(addNoticeController)
);

export default router;
