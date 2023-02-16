import createError from "http-errors";
import { setSuccessResponse } from "../../helpers/setResponse.js";
import { User } from "../../models/userModel.js";

export const signupController = async (req, res) => {
  try {
    const newUserData = await User.create({ ...req.body });

    const newUser = {
      email: newUserData.email,
      name: newUserData.name,
      city: newUserData.city,
      phone: newUserData.phone,
    };

    res.status(201).json(setSuccessResponse(201, newUser));
  } catch (error) {
    if (error?.code === 11000) {
      const field = Object.keys(error.keyValue);
      throw new createError(409, ` ${field} already exists.`);
    }
  }
};
