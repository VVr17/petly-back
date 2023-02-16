import { setSuccessResponse } from "../../helpers/setResponse.js";
import { User } from "../../models/userModel.js";

export const updateUserController = async (req, res, next) => {
    const { _id } = req;
    const { name, email, birthday, phone, city } = req.body;

    const updatedUser = await User.findByIdAndUpdate(_id, { name, email, birthday, phone, city });

    return res.json(setSuccessResponse(201, updatedUser));
}
