import { User } from "../../models/userModel.js";
import { setSuccessResponse } from "../../helpers/setResponse.js";
import createError from "http-errors";

export const getCurrentUserController = async (req, res) => {
  const { userId } = req.user;

  const userDataWithPets = await User.findById(userId).populate("pets", {
    owner: userId,
  });

  if (!userDataWithPets) {
    throw new createError(404, `Not find user with id: ${_id}!`);
  }

  return res.json(setSuccessResponse(200, userDataWithPets));
};
