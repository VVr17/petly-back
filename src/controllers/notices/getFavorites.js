import { User } from "../../models/userModel.js";
import { setSuccessResponseNotices } from "../../helpers/setResponse.js";
import createError from "http-errors";

export const getFavoritesController = async (req, res) => {
  const { userId } = req.user;
  const { page = 1, limit = 12, search } = req.query;
  const skip = (page - 1) * limit;

  const user = await User.findOne({ _id: userId });
  const totalItems = user.favoriteNotices.length;

  const userDataWithNotices = await User.findOne({ _id: userId }).populate({
    path: "favoriteNotices",
    options: {
      select: "-createdAt -updatedAt",
      skip,
      limit: Number(limit),
    },
  });

  const favorites = userDataWithNotices.favoriteNotices;

  const filteredBySearch = !search
    ? favorites
    : favorites.filter((notice) =>
        notice.title.toLowerCase().includes(search.toLowerCase())
      );

  favorites.reverse();
  return res.json(setSuccessResponseNotices(200, filteredBySearch, totalItems));
};
