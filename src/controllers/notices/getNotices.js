import { setSuccessResponse } from "../../helpers/setResponse.js";
import { Notice } from "../../models/noticeModel.js";

export const getNotices = async (req, res) => {
  const { page = 1, limit = 8, search } = req.query;
  const skip = (page - 1) * limit;

  const data = await Notice.find(
    { title: { $regex: new RegExp(search, "i") } },
    "",
    {
      skip,
      limit: Number(limit),
    }
  );

  res.json(setSuccessResponse(200, data));
};
