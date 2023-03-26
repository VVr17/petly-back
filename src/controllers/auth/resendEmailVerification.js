import createError from "http-errors";
import { createAndUpdateJwt } from "../../helpers/createJwt.js";
import sendEmail from "../../helpers/emailService.js";
import { User } from "../../models/userModel.js";

const { EMAIL_VERIFICATION_SECRET } = process.env;

export const resendEmailVerificationController = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email }, { email: 1, emailVerified: 1 });

  if (!user) {
    throw new createError(401, `Email or password is wrong`);
  }

  // Check if user's email has been verified
  if (user.emailVerified) {
    throw new createError(400, "Email has already been verified");
  }

  // Generate a JWT for email verification
  const token = await createAndUpdateJwt(
    user._id,
    EMAIL_VERIFICATION_SECRET,
    "365d"
  );

  // Send a welcome email with the email verification link
  await sendEmail(email, "Welcome to Our App", token);

  res.status(200).json({ message: "Verification email has been sent" });
};
