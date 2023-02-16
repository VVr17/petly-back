import { setSuccessResponse } from "../../helpers/setResponse.js";
import { News } from "../../models/newsModel.js";

export const getNewsController = async (req, res) => {
  const news = await News.find();
  res.json(setSuccessResponse(200, news));
};
