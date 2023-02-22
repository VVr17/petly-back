import { Pet } from "../../models/petModel.js";
import { setSuccessResponse } from "../../helpers/setResponse.js";
import { User } from "../../models/userModel.js";
// import createError from "http-errors";

export const addPetController = async (req, res) => {
  // const { name, birthDate, breed, comments, photoURL } = req.body;

  const { userId } = req.user;
  const user = await User.findById(userId);
  const petData = req.body;

  const data = !!req.file
    ? { photoURL: req.file.path, owner: userId, ...petData }
    : { owner: userId, ...petData };

  const savedPet = await Pet.create(data);

  user.pets.push(savedPet._id);

  const updatedUser = await User.findByIdAndUpdate(
    { _id: userId },
    { pets: user.pets },
    { new: true }
  );

  return res.json(setSuccessResponse(201, savedPet));
};
