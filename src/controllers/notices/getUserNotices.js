import { setSuccessResponseNotices } from "../../helpers/setResponse.js";
import { Notice } from "../../models/noticeModel.js";

export const getUserNoticesController = async (req, res) => {
  const { userId } = req.user;
  const { page = 1, limit = 12, search } = req.query;
  const skip = (page - 1) * limit;

  const totalItems = await Notice.find({
    owner: userId,
    title: { $regex: new RegExp(search, "i") },
  }).count();

  const data = await Notice.find(
    { owner: userId, title: { $regex: new RegExp(search, "i") } },
    "-createdAt -updatedAt",
    {
      skip,
      limit: Number(limit),
    }
  ).sort({ createdAt: "descending" });

  res.json(setSuccessResponseNotices(200, data, totalItems));
};
