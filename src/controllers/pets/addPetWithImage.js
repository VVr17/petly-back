import { Pet } from "../../models/petModel.js";
import { setSuccessResponse } from "../../helpers/setResponse.js";
import { User } from "../../models/userModel.js";
// import createError from "http-errors";

export const addPetController = async (req, res) => {
  // const { name, birthDate, breed, photoURL, comments } = req.body;
  console.log("in controller");
  const { userId } = req.user;
  const user = await User.findById(userId);

  // const owner = req.user.id;
  const petData = req.body;

  console.log("petData", petData);
  // const data = !!req.file
  //   ? { avatarURL: req.file.path, owner, ...petData }
  //   : { owner, ...petData };

  // Pet.create(data)
  //   .then((pet) => {
  //     if (pet) {
  //       User.findByIdAndUpdate(owner, { $push: { userPets: pet._id } })
  //         .then((user) => {
  //           if (user) {
  //             res.status(201).json({ success: true, pet });
  //           }
  //         })
  //         .catch((err) => {
  //           throw new Error(err);
  //         });
  //     }
  //   })
  //   .catch((err) =>
  //     res.status(400).json({ success: false, error: err, message: err.message })
  // );

  // const savedPet = await Pet.create({
  //   owner: userId,
  //   name,
  //   birthDate,
  //   breed,
  //   // photoURL:
  //   comments,
  // });

  // user.pets.push(savedPet._id);
  //
  // const updatedUser = await User.findByIdAndUpdate(
  //   { _id: userId },
  //   { pets: user.pets },
  //   { new: true }
  // );
  return res.json("ok");
  // return res.json(setSuccessResponse(201, savedPet));
};
