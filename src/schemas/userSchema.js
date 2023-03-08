import BaseJoi from "joi";
import JoiDate from "@joi/date";
const Joi = BaseJoi.extend(JoiDate);

export const userSchema = Joi.object({
  email: Joi.string()
    .regex(
      /^(?=.{1,63}$)(?=.{2,}@)[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address"
    )
    .required()
    .min(12)
    .max(63),
  password: Joi.string()
    .min(7)
    .max(32)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{7,}$/,
      "minimum seven characters, at least one uppercase letter, one lowercase letter and one number"
    )
    .required(),
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
    )
    .required(),
  birthday: Joi.date()
    .less(Date.now())
    .format("DD.MM.YYYY")
    .allow("00.00.0000"),
  imageFile: Joi.object({
    originalname: Joi.string().required(),
    fieldname: Joi.string(),
    encoding: Joi.string(),
    mimetype: Joi.string(),
    path: Joi.string().required(),
    size: Joi.number(),
    filename: Joi.string(),
  }),
});
