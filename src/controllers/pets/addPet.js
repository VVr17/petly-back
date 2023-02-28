import { Pet } from "../../models/petModel.js";
import { setSuccessResponse } from "../../helpers/setResponse.js";
import { User } from "../../models/userModel.js";

export const addPetController = async (req, res) => {
  const { userId } = req.user;
  const petData = req.body;

  const data = !!req.file
    ? { photoURL: req.file.path, owner: userId, ...petData }
    : { owner: userId, ...petData };

  const savedPet = await Pet.create(data);

  await User.findByIdAndUpdate(
    { _id: userId },
    { $push: { pets: savedPet._id } },
    { new: true }
  );

  return res.json(setSuccessResponse(201, savedPet));
};
