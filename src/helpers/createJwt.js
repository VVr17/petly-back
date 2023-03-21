import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

dotenv.config();
const { JWT_SECRET } = process.env;

export const createAndUpdateJwt = async (userId, secret = JWT_SECRET, expiresIn = "24h") => {
  const token = jwt.sign({ userId }, secret, {
    expiresIn,
  }); // token expiration in 24hours by default
  await User.findOneAndUpdate({ _id: userId }, { token });

  return token;
};