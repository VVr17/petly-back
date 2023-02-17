// import { nanoid } from "nanoid"; добавить либу и сгенеровать айди
import { Pet } from "../../models/petModel.js";
import { setSuccessResponse } from "../../helpers/setResponse.js";
// import createError from "http-errors";

export const addPetController = async (req, res) => {
  const { name, birthday, breed, photoURL, comments } = req.body;

  //  TODO: add owner id

  const savedPet = await Pet.create({
    // _id: nanoid(),
    name,
    birthday,
    breed,
    // photoURL:
    comments,
  });

  return res.json(setSuccessResponse(201, savedPet));
};
