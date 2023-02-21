import { Pet } from "../../models/petModel.js";
import { setSuccessResponse } from "../../helpers/setResponse.js";
import { User } from "../../models/userModel.js";
// import createError from "http-errors";

export const addPetWithImageController = async (req, res) => {
  const { name, birthDate, breed, comments } = req.body;
  // console.log("in controller");
  // console.log("req.file", req.file.path);
  const { userId } = req.user;
  const user = await User.findById(userId);

  console.log(
    "name, birthDate, breed, comments",
    name,
    birthDate,
    breed,
    comments
  );
  // console.log("url", req.file.path);
  // const data = !!req.file
  //   ? { avatarURL: req.file.path, owner, ...petData }
  //   : { owner, ...petData };

  const savedPet = await Pet.create({
    owner: userId,
    name,
    birthDate,
    breed,
    photoURL: req?.file?.path || null,
    comments,
  });

  user.pets.push(savedPet._id);

  const updatedUser = await User.findByIdAndUpdate(
    { _id: userId },
    { pets: user.pets },
    { new: true }
  );
  // return res.json("ok");
  return res.json(setSuccessResponse(201, savedPet));
};
