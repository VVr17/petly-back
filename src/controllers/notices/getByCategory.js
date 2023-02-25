import { setSuccessResponse } from "../../helpers/setResponse.js";
import { Notice } from "../../models/noticeModel.js";
import createError from "http-errors";

export const getByCategoryController = async (req, res) => {
  const { page = 1, limit, search } = req.query;
  const { categoryName } = req.params;
  const skip = (page - 1) * limit;

  const data = await Notice.find(
    {
      category: categoryName,
      title: { $regex: new RegExp(search, "i") },
    },
    "title breed location category birthDate photoURL price owner",
    {
      skip,
      limit: Number(limit),
      // title: search,
    }
  ).sort({ createdAt: "descending" });
  if (!data.length) {
    throw new createError(404, "Notices not found");
  }

  res.json(setSuccessResponse(200, data));
};
