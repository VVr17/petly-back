import createError from "http-errors";
import { setSuccessResponse } from "../../helpers/setResponse.js";
import { Notice } from "../../models/noticeModel.js";
import { validateNoticeBody } from "../../middlewares/validateNoticeBody.js";

export const addNoticeController = async (req, res) => {
  const { categoryName } = req.params;
  const { body } = req;
  const { userId } = req.user;

  const data = await Notice.create({
    ...body,
    photoURL: req?.file?.path,
    category: categoryName,
    owner: userId,
  });

  res.json(setSuccessResponse(200, data));
};
