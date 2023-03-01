import { User } from "../../models/userModel.js";
import { setSuccessResponseNotices } from "../../helpers/setResponse.js";

export const getFavoritesController = async (req, res) => {
  const { userId } = req.user;
  const { page = 1, limit = 12, search } = req.query;
  const skip = (page - 1) * limit;

  const user = await User.findOne({ _id: userId }).populate({
    path: "favoriteNotices",
    match: { title: { $regex: new RegExp(search, "i") } },
    options: {
      select: "-createdAt -updatedAt",
    },
  });
  const totalItems = user.favoriteNotices.length;

  const userDataWithNotices = await User.findOne({ _id: userId }).populate({
    path: "favoriteNotices",
    match: { title: { $regex: new RegExp(search, "i") } },
    options: {
      select: "-createdAt -updatedAt",
      skip: Number(skip),
      limit: Number(limit),
    },
  });

  const favorites = userDataWithNotices.favoriteNotices;

  favorites.reverse();
  return res.json(setSuccessResponseNotices(200, favorites, totalItems));
};
