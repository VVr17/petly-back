import { User } from "../../models/userModel.js"
import { setSuccessResponse } from "../../helpers/setResponse.js";

export const removeFromFavoritesController = async (req, res) => {
   const { noticeId } = req.params
   const { userId } = req.user;
   const user = await User.findById(userId);
   const index = user.favoriteNotices.indexOf(noticeId);

   if (index === -1) {
      return res.json({
         code: 400,
         message: "Favorite is not found",
      });
   }

   user.favoriteNotices.splice(index, 1);
   await user.save();

   res.json(setSuccessResponse(200));
};
