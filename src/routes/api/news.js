import express from "express";
import { errorWrapper } from "../../helpers/errorWrapper.js";
import { getNewsController } from "../../controllers/news/getNews.js";

const router = new express.Router();

router.get("/news", errorWrapper(getNewsController));

export default router;
