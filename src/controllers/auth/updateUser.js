import { setSuccessResponse } from "../../helpers/setResponse.js";
import { User } from "../../models/userModel.js";

export const updateUserController = async (req, res) => {
  const { userId } = req.user;
  const { name, email, birthday, phone, city } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      name,
      email,
      birthday,
      phone,
      city,
      photoURL: req?.file?.path,
    },
    {
      new: true,
      fields: {
        createdAt: 0,
        updatedAt: 0,
        token: 0,
        password: 0,
        pets: 0,
        favoriteNotices: 0,
      },
    }
  );

  return res.json(setSuccessResponse(200, updatedUser));
};
