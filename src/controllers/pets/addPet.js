import { Pet } from "../../models/petModel.js";
import { setSuccessResponse } from "../../helpers/setResponse.js";
import { User } from "../../models/userModel.js";
// import createError from "http-errors";

export const addPetController = async (req, res) => {
  const { name, birthDate, breed, photoURL, comments } = req.body;
  const { userId } = req.user;
  const user = await User.findById(userId);

  const savedPet = await Pet.create({
    owner: userId,
    name,
    birthDate,
    breed,
    // photoURL:
    comments,
  });

  console.log("savedPet", savedPet);

  // user.pets.push(noticeId);

  // const updatedUser = await User.findByIdAndUpdate(
  //   { _id: userId },
  //   { pets: user.favoriteNotices },
  //   { new: true }
  // );

  return res.json(setSuccessResponse(201, savedPet));
};
