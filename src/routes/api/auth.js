import express from "express";
import { errorWrapper } from "../../helpers/errorWrapper.js";
import {
  signupController,
  loginController,
  logoutController,
  getCurrentUserController,
  updateUserController,
  googleAuthController,
  verifyEmailController,
  resendEmailVerificationController,
} from "../../controllers/auth/index.js";
import {
  loginSchema,
  userSchema,
  userUpdateSchema,
  googleAuthUserSchema,
  resendEmailSchema,
} from "../../schemas/index.js";
import {
  authMiddleware,
  uploadCloud,
  validateBody,
} from "../../middlewares/index.js";

const router = new express.Router();

router.post(
  "/signup",
  validateBody(userSchema),
  errorWrapper(signupController)
);
router.get("/verify/:token", errorWrapper(verifyEmailController));
router.post(
  "/verify",
  validateBody(resendEmailSchema),
  errorWrapper(resendEmailVerificationController)
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

export default router;
