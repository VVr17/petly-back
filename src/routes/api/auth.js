import express from "express";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { errorWrapper } from "../../helpers/errorWrapper.js";
import { validateBody } from "../../middlewares/validateBody.js";
import { userSchema } from "../../schemas/userSchema.js";
import {
  signupController,
  loginController,
  logoutController,
  getCurrentUserController,
} from "../../controllers/auth/index.js";
import { loginSchema } from "../../schemas/loginSchema.js";

const router = new express.Router();

router.post(
  "/signup",
  validateBody(userSchema),
  errorWrapper(signupController)
);
router.post("/login", validateBody(loginSchema), errorWrapper(loginController));
router.get("/logout", authMiddleware, errorWrapper(logoutController));
router.get("/current", authMiddleware, errorWrapper(getCurrentUserController));

export default router;
