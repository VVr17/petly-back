import { setSuccessResponse } from "../../helpers/setResponse.js";
import { Notice } from "../../models/noticeModel.js";

export const getByCategoryController = async (req, res) => {
  const { page = 1, limit = 8 } = req.query;
  const categoryName = req.params.categoryName;
  const skip = (page - 1) * limit;

  const data = await Notice.find({ category: categoryName }, "", {
    skip,
    limit: Number(limit),
  });

  res.json(setSuccessResponse(200, data));
};
