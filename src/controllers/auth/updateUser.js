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
    },
    { new: true }
  );

  return res.json(setSuccessResponse(201, updatedUser));
};
