import express from "express";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { uploadCloud } from "../../middlewares/uploadMiddleware.js";
import { validateBody } from "../../middlewares/validateBody.js";
import { errorWrapper } from "../../helpers/errorWrapper.js";
import {
  signupController,
  loginController,
  logoutController,
  getCurrentUserController,
  updateUserController,
  googleAuthController,
} from "../../controllers/auth/index.js";
import {
  loginSchema,
  userSchema,
  userUpdateSchema,
  googleAuthUserSchema,
} from "../../schemas/index.js";

import { verifyEmailController } from "../../controllers/auth/verifyEmailController.js";

const router = new express.Router();

router.post(
  "/signup",
  validateBody(userSchema),
  errorWrapper(signupController)
);
router.post("/login", validateBody(loginSchema), errorWrapper(loginController));
router.post(
  "/google/login",
  validateBody(googleAuthUserSchema),
  errorWrapper(googleAuthController)
);
router.get("/logout", authMiddleware, errorWrapper(logoutController));
router.get("/current", authMiddleware, errorWrapper(getCurrentUserController));
router.put(
  "/current",
  [
    authMiddleware,
    uploadCloud.single("userImage"),
    validateBody(userUpdateSchema),
  ],
  errorWrapper(updateUserController)
);

router.get("/verify/:token", errorWrapper(verifyEmailController));

export default router;
