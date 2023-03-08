import BaseJoi from "joi";
import JoiDate from "@joi/date";
const Joi = BaseJoi.extend(JoiDate);

export const userUpdateSchema = Joi.object({
  email: Joi.string()
    .regex(
      /^(?=.{1,63}$)(?=.{2,}@)[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address"
    )
    .min(12)
    .max(63),
  city: Joi.string()
    .min(4)
    .regex(
      /^[a-zA-Zа-яА-ЯіІїЇ]+(?:[-\s]?[a-zA-Zа-яА-ЯіІїЇ]+)*,\s*[a-zA-Zа-яА-ЯіІїЇ'’\s-]+$/,
      "Should be at least two words separated by string"
    ),
  phone: Joi.string()
    .min(13)
    .max(13)
    .regex(/^\+380\d{9}$/, "match +380123456789"),
  name: Joi.string()
    .min(3)
    .max(32)
    .regex(
      /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?: [a-zA-Zа-яА-ЯіІїЇґҐ]+)*$/,
      "Only letters can be accepted"
    ),
  birthday: Joi.date()
    .less(Date.now())
    .format("DD.MM.YYYY")
    .allow("00.00.0000"),
  imageFile: Joi.object({
    originalname: Joi.string(),
    fieldname: Joi.string(),
    encoding: Joi.string(),
    mimetype: Joi.string(),
    path: Joi.string(),
    size: Joi.number(),
    filename: Joi.string(),
  }),
});
