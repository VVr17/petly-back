import createError from "http-errors";
import { setSuccessResponse } from "../../helpers/setResponse.js";
import { Notice } from "../../models/noticeModel.js";
import { noticeSchema, noticeSellSchema } from "../../schemas/noticeSchema.js";
// import { validateBody } from "../../middlewares/validateBody.js";

export const addNoticeController = async (req, res) => {
  const categoryName = req.params.categoryName;
  const body = req.body;
  const { userId } = req.user;

  if (categoryName === "sell") {
    const { error } = noticeSellSchema.validate(body);
    if (error) {
      throw new createError(400, "missing required name field");
    }
  } else {
    const { error } = noticeSchema.validate(body);
    if (error) {
      throw new createError(400, "missing required name field");
    }
  }

  const data = await Notice.create({
    ...body,
    category: categoryName,
    owner: userId,
  });

  res.json(setSuccessResponse(200, data));
};
