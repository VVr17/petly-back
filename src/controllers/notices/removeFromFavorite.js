import { User } from "../../models/userModel.js";
import { setSuccessResponse } from "../../helpers/setResponse.js";
import createError from "http-errors";

export const removeFromFavoritesController = async (req, res) => {
  const { noticeId } = req.params;
  const { userId } = req.user;
  const user = await User.findById(userId);
  const index = user.favoriteNotices.indexOf(noticeId);

  if (index === -1) {
    throw new createError(400, `Notice with ${noticeId} has not been found`);
  }

  user.favoriteNotices.splice(index, 1);

  await User.findByIdAndUpdate(
    { _id: userId },
    { favoriteNotices: user.favoriteNotices },
    { new: true }
  );

  res.json(
    setSuccessResponse(
      200,
      `Notice with id=${noticeId} has been removed from favorites`
    )
  );
};
