import express from "express";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { errorWrapper } from "../../helpers/errorWrapper.js";
import { validateBody } from "../../middlewares/validateBody.js";
import {
  addPetController,
  deletePetController,
} from "../../controllers/pets/index.js";
import { petSchema } from "../../schemas/petSchema.js";

const router = new express.Router();

router.use(authMiddleware); // restricted routes

router.post("/", validateBody(petSchema), errorWrapper(addPetController));
router.delete("/:petId", errorWrapper(deletePetController));

export default router;
