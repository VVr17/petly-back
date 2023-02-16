import { User } from "../../models/userModel.js";
import { setSuccessResponse } from "../../helpers/setResponse.js";
import createError from "http-errors";

export const getCurrentUserController = async (req, res) => {
  const { _id } = req;
  
  const userDataWithPets = await User.findById(_id).populate("pets", { owner: _id });
  if (!userData) {
    throw new createError(404, `Not find user with id: ${_id}!`);
  }

  return res.json(setSuccessResponse(200, userDataWithPets));
};