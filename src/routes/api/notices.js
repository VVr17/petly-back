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
  getNotices,
} from "../../controllers/notices/index.js";

const router = new express.Router();

router.get("/", errorWrapper(getNotices));
router.get("/user", authMiddleware, errorWrapper(getUserNoticesController));
router.get("/category/:categoryName", errorWrapper(getByCategoryController));
router.get("/id/:noticeId", errorWrapper(getByIdController));

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

router.post(
  "/category/:categoryName",
  authMiddleware,
  errorWrapper(addNoticeController)
);

router.delete(
  "/id/:noticeId",
  authMiddleware,
  errorWrapper(removeNoticeController)
);

export default router;
