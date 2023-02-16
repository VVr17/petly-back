import { Notice } from "../../models/noticeModel.js";

export const getByCategoryController = async (req, res) => {
  const { page = 1, limit = 8 } = req.query;
  const { categoryName } = req.params.categoryName;

  // const data = await
  res.status(200).json("get by cat");
};
