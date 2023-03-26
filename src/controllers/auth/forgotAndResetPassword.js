import { User } from "../../models/userModel.js";
import sendEmail from "../../helpers/emailService.js";
import crypto from "crypto";
import { createAndUpdateJwt } from "../../helpers/createJwt.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import createError from "http-errors";

const resetPasswordTemplateID = "d-d80e6f828521438e976f6763c9a3acb0";
const { PASSWORD_RESET_SECRET } = process.env;

// Forgot password controller
export const forgotPasswordController = async (req, res) => {
    
  const email = req.body.email;
  const user = await User.findOne({ email });

  // Check if user exists
  if (!user) {
    throw new createError(404, "User not found");
  }

  // Generate a reset token and set its expiration time
  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetTokenExpiration = new Date(Date.now() + 3600000);

  // Update the user document with the reset token and its expiration
  await User.findByIdAndUpdate(user._id, {
    resetToken,
    resetTokenExpiration,
  });

  // Generate a JWT with the reset token and user ID
  const jwtResetToken = await createAndUpdateJwt(
    user._id,
    PASSWORD_RESET_SECRET,
    "1h",
    { resetToken }
  );

  // Send the password reset email
  await sendEmail(email, "Password Reset Request", jwtResetToken, resetPasswordTemplateID);

  res.status(200).json({ message: "Reset email sent" });
};

// Reset password controller
export const resetPasswordController = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, PASSWORD_RESET_SECRET);
    const userId = decoded.userId;

    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
      throw new createError(404, "User not found");
    }

    // Check if the reset token is valid and not expired
    if (
      user.resetToken === decoded.resetToken &&
      user.resetTokenExpiration > Date.now()
    ) {
      // Hash the new password and update the user document
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      await User.findByIdAndUpdate(userId, {
        password: hashedPassword,
        resetToken: undefined,
        resetTokenExpiration: undefined,
      });
      res.status(200).json({ message: "Password updated successfully" });
    } else {
      throw new createError(400, "Invalid or expired token");
    }
  } catch (err) {
    throw new createError(400, "Invalid token");
  }
};
