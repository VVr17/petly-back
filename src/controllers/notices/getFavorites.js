import { User } from "../../models/userModel.js";
import { setSuccessResponseNotices } from "../../helpers/setResponse.js";
import createError from "http-errors";

export const getFavoritesController = async (req, res) => {
  const { userId } = req.user;
  const { page = 1, limit = 12, search } = req.query;
  const skip = (page - 1) * limit;

  const userDataWithNotices = await User.findById(userId).populate(
    "favoriteNotices",
    "-createdAt -updatedAt"
  );

  const favorites = userDataWithNotices.favoriteNotices;
  const totalItems = favorites.length;

  const filteredBySearch = !search
    ? favorites
    : favorites.filter((notice) =>
        notice.title.toLowerCase().includes(search.toLowerCase())
      );

  favorites.reverse();
  return res.json(setSuccessResponseNotices(200, filteredBySearch, totalItems));
};
