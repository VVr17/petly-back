import { User } from "../../models/userModel.js";
import { setSuccessResponse } from "../../helpers/setResponse.js";

export const logoutController = async (req, res) => {
  const { userId } = req.user;

  await User.findByIdAndUpdate(userId, { token: null });
  return res.json(setSuccessResponse(204));
};
