import * as dotenv from "dotenv";
import createError from "http-errors";
import bcrypt from "bcrypt";
import { User } from "../../models/userModel.js";
import { Pet } from "../../models/petModel.js";
import { setSuccessResponse } from "../../helpers/setResponse.js";
import { createAndUpdateJwt } from "../../helpers/createJwt.js";

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne(
    { email },
    { email: 1, password: 1, name: 1, city: 1, phone: 1 }
  );

  if (!user) {
    throw new createError(401, `Email or password is wrong`);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new createError(401, `Email or password is wrong`);
  }

  const token = await createAndUpdateJwt(user._id);

  const userData = {
    token,
    user: {
      email: user.email,
      name: user.name,
      city: user.city,
      phone: user.phone,
    },
  };

  res.json(setSuccessResponse(200, userData));
};
