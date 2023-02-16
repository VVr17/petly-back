import * as dotenv from "dotenv";
import createError from "http-errors";
import bcrypt from "bcrypt";
import { User } from "../../models/userModel.js";
import jwt from "jsonwebtoken";
import { setSuccessResponse } from "../../helpers/setResponse.js";

dotenv.config();
const { JWT_SECRET } = process.env;

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }, { email: 1, password: 1 });

  if (!user) throw new createError(401, `Email or password is wrong`);

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new createError(401, `Email or password is wrong`);
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: "24h",
  }); // token expiration in 24hours
  await User.findOneAndUpdate(user._id, { token });

  const userData = {
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    },
  };

  res.json(setSuccessResponse(200, userData));
};
