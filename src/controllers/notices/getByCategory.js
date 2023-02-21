import { setSuccessResponse } from "../../helpers/setResponse.js";
import { Notice } from "../../models/noticeModel.js";
import createError from "http-errors";

export const getByCategoryController = async (req, res) => {
  const { page = 1, limit = 8 } = req.query;
  const { categoryName } = req.params;
  const skip = (page - 1) * limit;

  const data = await Notice.find(
    { category: categoryName },
    "title breed location category birthDate",
    {
      skip,
      limit: Number(limit),
    }
  ).sort({ createdAt: "descending" });
  if (!data.length) {
    throw new createError(404, "Notices not found");
  }

  res.json(setSuccessResponse(200, data));
};
