import createError from "http-errors";
import { noticeSchema, noticeSellSchema } from "../schemas/noticeSchema.js";

export const validateNoticeBody = (req, res, next) => {
  const { categoryName } = req.params;
  const { body } = req;

  const { error } =
    categoryName === "sell"
      ? noticeSellSchema.validate({ ...body, imageFile: req.file })
      : noticeSchema.validate({ ...body, imageFile: req.file });

  if (error) {
    next(new createError(400, error.message));
  }

  next();
};
