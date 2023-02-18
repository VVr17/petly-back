import { User } from "../../models/userModel.js"
import { Notice } from "../../models/noticeModel.js"
import { setSuccessResponse } from "../../helpers/setResponse.js";


export const getFavoritesController = async (req, res) => {
   const { userId } = req.user;
   const user = await User.findById(userId)
   const idArray = user.favoriteNotices.map(favorite => { return favorite.toString() });  
   const favorites = await Notice.find({ _id: idArray });


   if (!favorites) {       
      const error = new Error();
      throw error(404, 'You have no any favorite notices');    
  }
  res.json(setSuccessResponse(200, favorites));
};






// import {User} from "../../models/userModel.js"
// import { setSuccessResponse } from "../../helpers/setResponse.js";


// export const getFavoritesController = async (req, res) => {
//    const { userId } = req.user;
//    const UserNotice = await User.findById(userId)
//    if (UserNotice) {
//       res.json(setSuccessResponse(200, UserNotice.favoriteNotices));
//    }
// };