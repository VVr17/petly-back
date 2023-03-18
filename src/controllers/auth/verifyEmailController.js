import createError from "http-errors";
import { User } from "../../models/userModel.js";
import jwt from "jsonwebtoken";


export const verifyEmailController = async (req, res) => {
  try {
    
    const { token } = req.params;
    if (!token) throw new createError(400, "Verification token is missing");

    // Verify the token and get the userId
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by their ID
    const user = await User.findById(userId);
    if (!user) throw new createError(404, "User not found");

    // Check if the email is already verified
    if (user.emailVerified) throw new createError(400, "Email is already verified");

    // Update the user's email verification status
    await User.findByIdAndUpdate(userId, { emailVerified: true });

    res.status(200).json({ message: "Email successfully verified" });

  } catch (error) {
    if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
      next(new createError(400, `Verification token error: ${error.message}`));
    }
    next(error);
  }
};
