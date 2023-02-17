import createError from "http-errors";
import { noticeSchema, noticeSellSchema } from "../schemas/noticeSchema.js";

export const validateNoticeBody = (categoryName, body) => {
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
};
