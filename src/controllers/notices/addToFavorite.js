import { User } from "../../models/userModel.js";
import { setSuccessResponse } from "../../helpers/setResponse.js";
import createError from "http-errors";

export const addToFavoriteController = async (req, res) => {
  const { noticeId } = req.params;
  const { userId } = req.user;
  const user = await User.findById(userId);

  const checkNotice = user.favoriteNotices.includes(noticeId);

  if (checkNotice) {
    throw new createError(
      409,
      `Notice with id: ${noticeId} has been already added`
    );
  }

  user.favoriteNotices.push(noticeId);

  const updatedUser = await User.findByIdAndUpdate(
    { _id: userId },
    { favoriteNotices: user.favoriteNotices },
    { new: true }
  );

  res.json(
    setSuccessResponse(200, { favoriteNotices: updatedUser.favoriteNotices })
  );
};
