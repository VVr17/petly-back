import BaseJoi from "joi";
import JoiDate from "@joi/date";
const Joi = BaseJoi.extend(JoiDate);

export const userSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .regex(
      /^([a-zA-Z][\w+-]+(?:\.\w+)?)@([\w-]+(?:\.[a-zA-Z]{2,10})+)$/,
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
      /^[a-zA-Zа-яА-Я]+(?:-[a-zA-Zа-яА-Я]+)*,\s*[a-zA-Zа-яА-Я\s]+$/,
      "Should be at least two words separated by string"
    )
    .required(),
  phone: Joi.string()
    .min(13)
    .max(13)
    .regex(/^\+380\d{9}$/, "match +380123456789")
    .required(),
  name: Joi.string()
    .min(3)
    .max(12)
    .regex(
      /^[a-zA-Zа-яА-Я]+(?: [a-zA-Zа-яА-Я]+)*$/,
      "Only letters can be accepted"
    )
    .required(),
  birthday: Joi.date().less(Date.now()).format("DD.MM.YYYY"),
  // imageFile: Joi.object({
  //   originalname: Joi.string().required(),
  //   fieldname: Joi.string(),
  //   encoding: Joi.string(),
  //   mimetype: Joi.string(),
  //   path: Joi.string().required(),
  //   size: Joi.number(),
  //   filename: Joi.string(),
  // }),
});
