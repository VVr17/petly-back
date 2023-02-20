import BaseJoi from "joi";
import JoiDate from "@joi/date";
const Joi = BaseJoi.extend(JoiDate);

export const noticeSchema = Joi.object({
  title: Joi.string().min(2).max(48).required(),
  photoURL: Joi.string().uri().required(),
  name: Joi.string().min(2).max(16).required(),
  breed: Joi.string().min(2).max(24).required(),
  sex: Joi.string().required(),
  birthDate: Joi.date().format("DD.MM.YYYY").required(),
  location: Joi.string()
    .regex(
      /^\s*(?:\w+\s*,\s*){1,}(?:\w+\s*)$/,
      "at least two words separated by string"
    )
    .required(),
  comments: Joi.string().min(8).max(120).required(),
});

export const noticeSellSchema = Joi.object({
  title: Joi.string().min(2).max(48).required(),
  photoURL: Joi.string().uri().required(),
  name: Joi.string().min(2).max(16).required(),
  breed: Joi.string().min(2).max(24).required(),
  sex: Joi.string().required(),
  birthDate: Joi.date().format("DD-MM-YYYY").required(),
  location: Joi.string()
    .regex(
      /^\s*(?:\w+\s*,\s*){1,}(?:\w+\s*)$/,
      "at least two words separated by string"
    )
    .required(),
  comments: Joi.string().min(8).max(120).required(),
  price: Joi.number().greater(0).required().required(),
});

// Joi.array().items(Joi.string().required(), Joi.string().required());
