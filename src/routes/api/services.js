import express from "express";
import { getServicesController } from "../../controllers/services/getServices.js";
import { errorWrapper } from "../../helpers/errorWrapper.js";

const router = new express.Router();

router.get("/", errorWrapper(getServicesController));

export default router;
