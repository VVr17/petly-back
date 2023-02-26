import { setSuccessResponseNotices } from "../../helpers/setResponse.js";
import { Notice } from "../../models/noticeModel.js";

export const getUserNoticesController = async (req, res) => {
  const { userId } = req.user;
  const totalItems = await Notice.find({ owner: userId })
    .sort({ createdAt: "descending" })
    .count();

  const data = await Notice.find({ owner: userId }, "-createdAt -updatedAt");
  res.json(setSuccessResponseNotices(200, data, totalItems));
};
