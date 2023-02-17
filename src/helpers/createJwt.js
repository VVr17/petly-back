import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

dotenv.config();
const { JWT_SECRET } = process.env;

export const createAndUpdateJwt = async (userId) => {
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "24h",
  }); // token expiration in 24hours
  await User.findOneAndUpdate(userId, { token });

  return token;
};
