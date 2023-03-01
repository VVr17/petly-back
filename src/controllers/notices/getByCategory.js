import { setSuccessResponseNotices } from "../../helpers/setResponse.js";
import { Notice } from "../../models/noticeModel.js";
import createError from "http-errors";

export const getByCategoryController = async (req, res) => {
  const { page = 1, limit = 12, search } = req.query;
  const { categoryName } = req.params;
  const skip = (page - 1) * limit;

  const totalItems = await Notice.find({
    category: categoryName,
    title: { $regex: new RegExp(search, "i") },
  }).count();

  const data = await Notice.find(
    {
      category: categoryName,
      title: { $regex: new RegExp(search, "i") },
    },
    "title breed location category birthDate photoURL price owner",
    {
      skip,
      limit: Number(limit),
    }
  ).sort({ createdAt: "descending" });

  res.json(setSuccessResponseNotices(200, data, totalItems));
};
