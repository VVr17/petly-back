import { User } from "../../models/userModel.js";
import { setSuccessResponseNotices } from "../../helpers/setResponse.js";
import createError from "http-errors";

export const getFavoritesController = async (req, res) => {
  const { userId } = req.user;

  const totalItems = await User.findById(userId)
    .populate("favoriteNotices", "-createdAt -updatedAt")
    .sort({ createdAt: "descending" })
    .count();

  const userDataWithNotices = await User.findById(userId).populate(
    "favoriteNotices",
    "-createdAt -updatedAt"
  );

  if (userDataWithNotices.favoriteNotices.length === 0) {
    throw new createError(404, `Not find any notices!`);
  }

  return res.json(
    setSuccessResponseNotices(
      200,
      userDataWithNotices.favoriteNotices,
      totalItems
    )
  );
};
