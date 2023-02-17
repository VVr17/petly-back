import createError from "http-errors";
import { createAndUpdateJwt } from "../../helpers/createJwt.js";
import { setSuccessResponse } from "../../helpers/setResponse.js";
import { User } from "../../models/userModel.js";

export const signupController = async (req, res) => {
  try {
    const createdUser = await User.create({ ...req.body });
    const token = await createAndUpdateJwt(createdUser._id);

    const newUser = {
      token,
      user: {
        email: createdUser.email,
        name: createdUser.name,
        city: createdUser.city,
        phone: createdUser.phone,
      },
    };

    res.status(201).json(setSuccessResponse(201, newUser));
  } catch (error) {
    if (error?.code === 11000) {
      const field = Object.keys(error.keyValue);
      throw new createError(409, ` ${field} already exists.`);
    }
  }
};
