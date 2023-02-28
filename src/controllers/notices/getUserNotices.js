import { setSuccessResponseNotices } from "../../helpers/setResponse.js";
import { Notice } from "../../models/noticeModel.js";

export const getUserNoticesController = async (req, res) => {
  const { userId } = req.user;
  const { search } = req.query;
  const totalItems = await Notice.find({ owner: userId }).count();

  const data = await Notice.find(
    { owner: userId, title: { $regex: new RegExp(search, "i") } },
    "-createdAt -updatedAt"
  ).sort({ createdAt: "descending" });

  res.json(setSuccessResponseNotices(200, data, totalItems));
};
