import { Notice } from "../../models/noticeModel.js";
// import { NoticeSell } from "../../models/noticeModel.js";

export const getByCategoryController = async (req, res) => {
  const { page = 1, limit = 8 } = req.query;
  const categoryName = req.params.categoryName;
  const skip = (page - 1) * limit;
  const data = await Notice.find({ category: categoryName });

  // const data = await
  res.status(200).json(data);
};
