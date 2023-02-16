const { Notice } = require("../../models/noticeModel");
export const getByCategoryController = async (req, res) => {
  const { page = 1, limit = 8 } = req.query;
  const { gategoryName } = req.params.gategoryName;

  // const data = await
  res.status(200).json("get by cat");
};
