import express from "express";
import { errorWrapper } from "../../helpers/errorWrapper.js";
import {
  authMiddleware,
  uploadCloud,
  validateBody,
} from "../../middlewares/index.js";
import {
  addPetController,
  deletePetController,
} from "../../controllers/pets/index.js";
import { petSchema } from "../../schemas/index.js";

const router = new express.Router();

router.use(authMiddleware); // restricted routes

router.post(
  "/",
  uploadCloud.single("petImage"),
  validateBody(petSchema),
  errorWrapper(addPetController)
);
router.delete("/:petId", errorWrapper(deletePetController));

export default router;
