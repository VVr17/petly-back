import createError from "http-errors";
import { User } from "../../models/userModel.js";
import jwt from "jsonwebtoken";

const { EMAIL_VERIFICATION_SECRET, BASE_FRONT_URL } = process.env;

export const verifyEmailController = async (req, res) => {
  // Extract token from request parameters
  const { token } = req.params;
  if (!token) throw new createError(400, "Verification token is missing");

  // Verify the token and get the userId
  const { userId } = jwt.verify(token, EMAIL_VERIFICATION_SECRET);

  // Find the user by their ID
  const user = await User.findById(userId);
  if (!user) throw new createError(404, "User not found");

  // Check if the email is already verified
  if (user.emailVerified) {
    res.redirect(`${BASE_FRONT_URL}/emailVerified`);
  }

  // Update the user's email verification status
  await User.findByIdAndUpdate(userId, { emailVerified: true });

  // Redirect the user to the URL after successful verification
  res.redirect(`${BASE_FRONT_URL}/emailVerified`);
};
