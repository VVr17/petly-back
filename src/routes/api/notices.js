import express from "express";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { errorWrapper } from "../../helpers/errorWrapper.js";
import { validateBody } from "../../middlewares/validateBody.js";
import { noticeSchema } from "../../schemas/noticeSchema.js";
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

const router = new express.Router();

router.use(authMiddleware); // restricted routes

router.get("/", errorWrapper(getUserNoticesController));
router.get("/category/:categoryName", errorWrapper(getByCategoryController));
router.get("/id/:noticeId", errorWrapper(getByIdController));

router.post("/favorites/:noticeId", errorWrapper(addToFavoriteController));
router.get("/favorites", errorWrapper(getFavoritesController));
router.delete(
  "/favorites/:noticeId",
  errorWrapper(removeFromFavoritesController)
);

router.post(
  "/category/:categoryName",
  validateBody(noticeSchema),
  errorWrapper(addNoticeController)
);

router.delete("/id/:noticeId", errorWrapper(removeNoticeController));

export default router;
