import { setSuccessResponseNotices } from "../../helpers/setResponse.js";
import { Notice } from "../../models/noticeModel.js";
import createError from "http-errors";

export const getByCategoryController = async (req, res) => {
<<<<<<< HEAD
  const { page = 1, limit } = req.query;
=======
  const { page = 1, limit, search } = req.query;
>>>>>>> 6971270c506863fed61c6cc8d1c69d31eca7491d
  const { categoryName } = req.params;
  const skip = (page - 1) * limit;
  const totalItems = await Notice.find({ category: categoryName }).count();

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
  if (!data.length) {
    throw new createError(404, "Notices not found");
  }

  res.json(setSuccessResponseNotices(200, data, totalItems));
};
