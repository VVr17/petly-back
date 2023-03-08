import createError from "http-errors";
import { createAndUpdateJwt } from "../../helpers/createJwt.js";
import { setSuccessResponse } from "../../helpers/setResponse.js";
import { User } from "../../models/userModel.js";

export const googleAuthController = async (req, res) => {
  try {
    const { email } = req.body;
    let user = null;

    const existedUser = await User.findOne(
      { email },
      { email: 1, name: 1, city: 1, phone: 1 }
    );

    if (existedUser) {
      user = existedUser;
    } else {
      const { email, name, city, phone, _id } = await User.create({
        ...req.body,
      });
      user = { email, name, city, phone, _id };
    }

    const token = await createAndUpdateJwt(user._id);

    res.status(200).json(
      setSuccessResponse(200, {
        token,
        user,
      })
    );
  } catch (error) {
    if (error?.code === 11000) {
      const field = Object.keys(error.keyValue);
      throw new createError(409, ` ${field} already exists.`);
    }
  }
};
