import { User } from "../../models/userModel.js"
import { setSuccessResponse } from "../../helpers/setResponse.js";

export const addToFavoriteController = async (req, res) => {
   const { noticeId } = req.params
   const { userId } = req.user;
   const user = await User.findById(userId);

   const checkNotice = user.favoriteNotices.includes(noticeId);

   if (checkNotice) {
      return res.json({
         code: 409,
         message: 'Notice is already added.',
       });
   }
   
   user.favoriteNotices.push(noticeId);
   await user.save();


   res.json(setSuccessResponse(200, user.favoriteNotices));

};
