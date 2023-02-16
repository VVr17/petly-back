import { User } from "../../models/userModel.js";
import { setSuccessResponse } from "../../helpers/setResponse.js";

export const logoutController = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: null });
  return res.json(setSuccessResponse(204));
};