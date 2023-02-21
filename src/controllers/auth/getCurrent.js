import { User } from "../../models/userModel.js";
import { Pet } from "../../models/petModel.js";
import { setSuccessResponse } from "../../helpers/setResponse.js";
import createError from "http-errors";

export const getCurrentUserController = async (req, res) => {
  const { userId } = req.user;

  const userDataWithPets = await User.findById(userId, {
    createdAt: 0,
    token: 0,
    updatedAt: 0,
    password: 0,
  }).populate({
    path: "pets",
    select: "name _id birthDate breed comments photoURL",
  });

  if (!userDataWithPets) {
    throw new createError(404, `Not find user with id: ${userId}!`);
  }

  return res.json(setSuccessResponse(200, userDataWithPets));
};
