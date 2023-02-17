import { setSuccessResponse } from "../../helpers/setResponse.js";
import { Notice } from "../../models/noticeModel.js";

export const getUserNoticesController = async (req, res) => {
  const { _id } = req.user;

  const data = await Notice.find({ owner: _id });
  res.json(setSuccessResponse(200, data));
};
