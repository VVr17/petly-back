import { Pet } from "../../models/petModel.js";
import { setSuccessResponse } from "../../helpers/setResponse.js";
import createError from "http-errors";
import { User } from "../../models/userModel.js";

export const deletePetController = async (req, res) => {
  const { userId } = req.user;
  const { petId } = req.params;

  const delPet = await Pet.findById(petId);
  if (!delPet) {
    throw new createError(404, `Not find pet with id: ${petId}!`);
  }

  await Pet.findByIdAndRemove(petId);

  await User.findByIdAndUpdate(
    { _id: userId },
    { $pull: { pets: petId } },
    { new: true }
  );

  return res.json(
    setSuccessResponse(200, { message: `Pet with id: ${petId} was deleted` })
  );
};
