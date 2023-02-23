import BaseJoi from "joi";
import JoiDate from "@joi/date";
const Joi = BaseJoi.extend(JoiDate);

export const noticeSchema = Joi.object({
  title: Joi.string().min(2).max(48),
  imageFile: Joi.object({
    originalname: Joi.string(),
    fieldname: Joi.string(),
    encoding: Joi.string(),
    mimetype: Joi.string(),
    path: Joi.string(),
    size: Joi.number(),
    filename: Joi.string(),
  }),
  name: Joi.string(),
  // .min(2)
  // .max(16)
  // .regex(
  //   /^[a-zA-Zа-яА-Я]+(?: [a-zA-Zа-яА-Я]+)*$/,
  //   "Only letters can be accepted"
  // ),
  breed: Joi.string(),
  // .min(2)
  // .max(24)
  // .regex(
  //   /^[a-zA-Zа-яА-Я]+(?: [a-zA-Zа-яА-Я]+)*$/,
  //   "Only letters can be accepted"
  // ),
  sex: Joi.string().valid("male", "female"),
  birthDate: Joi.date().less(Date.now()).format("DD.MM.YYYY"),
  location: Joi.string(),
  //   .regex(
  //   /^[a-zA-Zа-яА-Я]+(?:-[a-zA-Zа-яА-Я]+)*,\s*[a-zA-Zа-яА-Я\s]+$/,
  //   "Should be at least two words separated by string"
  // ),
  comments: Joi.string().min(8).max(200),
});

export const noticeSellSchema = Joi.object({
  title: Joi.string().min(2).max(48),
  imageFile: Joi.object({
    originalname: Joi.string(),
    fieldname: Joi.string(),
    encoding: Joi.string(),
    mimetype: Joi.string(),
    path: Joi.string(),
    size: Joi.number(),
    filename: Joi.string(),
  }),
  name: Joi.string()
    .min(2)
    .max(16)
    .regex(
      /^[a-zA-Zа-яА-Я]+(?: [a-zA-Zа-яА-Я]+)*$/,
      "Only letters can be accepted"
    ),
  breed: Joi.string()
    .min(2)
    .max(24)
    .regex(
      /^[a-zA-Zа-яА-Я]+(?: [a-zA-Zа-яА-Я]+)*$/,
      "Only letters can be accepted"
    ),
  sex: Joi.string().valid("male", "female"),
  birthDate: Joi.date().less(Date.now()).format("DD.MM.YYYY"),
  location: Joi.string().regex(
    /^[a-zA-Zа-яА-Я]+(?:-[a-zA-Zа-яА-Я]+)*,\s*[a-zA-Zа-яА-Я\s]+$/,
    "Should be at least two words separated by string"
  ),
  comments: Joi.string().min(8).max(200),
  price: Joi.number().greater(0),
});

// Joi.array().items(Joi.string(), Joi.string());
