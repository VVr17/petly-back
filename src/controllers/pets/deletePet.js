import { Pet } from "../../models/petModel.js";
import { setSuccessResponse } from "../../helpers/setResponse.js";
import createError from "http-errors";

export const deletePetController = async (req, res) => {
  const { petId } = req.params;

  const delPet = await Pet.findById(petId);
  if (!delPet) {
	throw new createError(404, `Not find pet with id: ${petId}!`);
  }

  await Pet.findByIdAndRemove(petId);
  return res.json(setSuccessResponse(200, {"message": "Pet was deleted", delPet}));
};