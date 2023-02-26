import BaseJoi from "joi";
import JoiDate from "@joi/date";
const Joi = BaseJoi.extend(JoiDate);

export const petSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(16)
    .regex(
      /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?: [a-zA-Zа-яА-ЯіІїЇґҐ]+)*$/,
      "Only letters can be accepted"
    )
    .required(),
  birthDate: Joi.date().less(Date.now()).format("DD.MM.YYYY").required(),
  breed: Joi.string()
    .min(2)
    .max(24)
    .regex(
      /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?: [a-zA-Zа-яА-ЯіІїЇґҐ]+)*$/,
      "Only letters can be accepted"
    )
    .required(),
  comments: Joi.string().min(8).max(200),
  imageFile: Joi.object({
    originalname: Joi.string().required(),
    fieldname: Joi.string(),
    encoding: Joi.string(),
    mimetype: Joi.string(),
    path: Joi.string().required(),
    size: Joi.number(),
    filename: Joi.string(),
  }).required(),
});
