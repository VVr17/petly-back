import createError from "http-errors";
import { createAndUpdateJwt } from "../../helpers/createJwt.js";
import { setSuccessResponse } from "../../helpers/setResponse.js";
import { User } from "../../models/userModel.js";
import sendEmail from "../../helpers/emailService.js";

const { EMAIL_VERIFICATION_SECRET } = process.env;

export const signupController = async (req, res) => {
  try {
    // Create a new user in the database
    const { email, name, city, phone, _id } = await User.create({
      ...req.body,
    });

    // Generate a JWT for email verification
    const token = await createAndUpdateJwt(
      _id,
      EMAIL_VERIFICATION_SECRET,
      "365d"
    );

    // Send a welcome email with the email verification link
    await sendEmail(email, "Welcome to Our App", token);

    // Return the newly created user in the response
    const newUser = {
      email,
      name,
      city,
      phone,
    };

    res.status(201).json(setSuccessResponse(201, newUser));
  } catch (error) {
    // Handle duplicate key errors
    if (error?.code === 11000) {
      const field = Object.keys(error.keyValue);
      throw new createError(409, ` ${field} already exists.`);
    }
  }
};
