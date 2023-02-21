import { Pet } from "../../models/petModel.js";
import { setSuccessResponse } from "../../helpers/setResponse.js";
import createError from "http-errors";
import { User } from "../../models/userModel.js";

export const deletePetController = async (req, res) => {
  const { userId } = req.user;
  const { petId } = req.params;
  const user = await User.findById(userId);
  const index = user.pets.indexOf(petId);

  const delPet = await Pet.findById(petId);
  if (!delPet) {
    throw new createError(404, `Not find pet with id: ${petId}!`);
  }

  await Pet.findByIdAndRemove(petId);

  user.pets.splice(index, 1);

  await User.findByIdAndUpdate(
    { _id: userId },
    { pets: user.pets },
    { new: true }
  );

  return res.json(
    setSuccessResponse(200, { message: `Pet with id: ${petId} was deleted` })
  );
};
