import { User } from "../../models/userModel.js";
import { setSuccessResponse } from "../../helpers/setResponse.js";
import createError from "http-errors";

export const removeFromFavoritesController = async (req, res) => {
  const { noticeId } = req.params;
  const { userId } = req.user;
  const user = await User.findById(userId);

  if (!user.favoriteNotices.includes(noticeId)) {
    throw new createError(400, `Notice with ${noticeId} has not been found`);
  }

  await User.findByIdAndUpdate(
    { _id: userId },
    { $pull: { favoriteNotices: noticeId } },
    { new: true }
  );

  res.json(
    setSuccessResponse(
      200,
      `Notice with id=${noticeId} has been removed from favorites`
    )
  );
};
