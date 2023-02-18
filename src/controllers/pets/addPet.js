import { Pet } from "../../models/petModel.js";
import { setSuccessResponse } from "../../helpers/setResponse.js";
// import createError from "http-errors";

export const addPetController = async (req, res) => {
  const { name, birthDate, breed, photoURL, comments } = req.body;
  const { userId } = req.user;

  const savedPet = await Pet.create({
    owner: userId,
    name,
    birthDate,
    breed,
    // photoURL:
    comments,
  });

  return res.json(setSuccessResponse(201, savedPet));
};
