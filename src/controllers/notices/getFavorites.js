import { User } from "../../models/userModel.js";
import { setSuccessResponse } from "../../helpers/setResponse.js";
import createError from "http-errors";

export const getFavoritesController = async (req, res) => {
  const { userId } = req.user;

  const userDataWithNotices = await User.findById(userId).populate(
    "favoriteNotices",
    "-createdAt -updatedAt -owner"
  );

  if (userDataWithNotices.favoriteNotices.length === 0) {
    throw new createError(404, `Not find any notices!`);
  }

  return res.json(setSuccessResponse(200, userDataWithNotices.favoriteNotices));
};
