import { User } from "../../models/userModel.js";
import { setSuccessResponse } from "../../helpers/setResponse.js";
import createError from "http-errors";

export const addToFavoriteController = async (req, res) => {
  const { noticeId } = req.params;
  const { userId } = req.user;

  const user = await User.findById(userId);
  const isInFavorites = user.favoriteNotices.includes(noticeId);

  if (isInFavorites) {
    throw new createError(
      409,
      `Notice with id: ${noticeId} has been already added`
    );
  }

  await User.findByIdAndUpdate(
    { _id: userId },
    { $push: { favoriteNotices: noticeId } },
    { new: true }
  );

  res.json(
    setSuccessResponse(
      200,
      `Notice with id=${noticeId} has been added favorites`
    )
  );
};
