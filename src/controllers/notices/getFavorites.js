import { User } from "../../models/userModel.js";
import { setSuccessResponseNotices } from "../../helpers/setResponse.js";
import createError from "http-errors";

export const getFavoritesController = async (req, res) => {
  const { userId } = req.user;
  const { search } = req.query;

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
