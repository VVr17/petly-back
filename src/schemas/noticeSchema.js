import BaseJoi from "joi";
import JoiDate from "@joi/date";
const Joi = BaseJoi.extend(JoiDate);

export const noticeSchema = Joi.object({
  title: Joi.string().min(2).max(48).required(),
  imageFile: Joi.object({
    originalname: Joi.string().required(),
    fieldname: Joi.string(),
    encoding: Joi.string(),
    mimetype: Joi.string(),
    path: Joi.string().required(),
    size: Joi.number(),
    filename: Joi.string(),
  }).required(),
  name: Joi.string()
    .min(2)
    .max(16)
    .regex(
      /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?: [a-zA-Zа-яА-ЯіІїЇґҐ]+)*$/,
      "Only letters can be accepted"
    )
    .required(),
  breed: Joi.string()
    .min(2)
    .max(24)
    .regex(
      /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?: [a-zA-Zа-яА-ЯіІїЇґҐ]+)*$/,
      "Only letters can be accepted"
    )
    .required(),
  sex: Joi.string().valid("male", "female").required(),
  birthDate: Joi.date().less(Date.now()).format("DD.MM.YYYY").required(),
  location: Joi.string()
    .regex(
      /^[a-zA-Zа-яА-ЯіІїЇ]+(?:[-\s]?[a-zA-Zа-яА-ЯіІїЇ]+)*,\s*[a-zA-Zа-яА-ЯіІїЇ'’\s-]+$/,
      "Should be at least two words separated by string"
    )
    .required(),
  comments: Joi.string().min(8).max(200).required(),
});

export const noticeSellSchema = Joi.object({
  title: Joi.string().min(2).max(48).required(),
  imageFile: Joi.object({
    originalname: Joi.string().required(),
    fieldname: Joi.string(),
    encoding: Joi.string(),
    mimetype: Joi.string(),
    path: Joi.string().required(),
    size: Joi.number(),
    filename: Joi.string(),
  }),
  name: Joi.string()
    .min(2)
    .max(16)
    .regex(
      /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?: [a-zA-Zа-яА-ЯіІїЇґҐ]+)*$/,
      "Only letters can be accepted"
    )
    .required(),
  breed: Joi.string()
    .min(2)
    .max(24)
    .regex(
      /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?: [a-zA-Zа-яА-ЯіІїЇґҐ]+)*$/,
      "Only letters can be accepted"
    )
    .required(),
  sex: Joi.string().valid("male", "female").required(),
  birthDate: Joi.date().less(Date.now()).format("DD.MM.YYYY").required(),
  location: Joi.string()
    .regex(
      /^[a-zA-Zа-яА-ЯіІїЇ]+(?:[-\s]?[a-zA-Zа-яА-ЯіІїЇ]+)*,\s*[a-zA-Zа-яА-ЯіІїЇ'’\s-]+$/,
      "Should be at least two words separated by string"
    )
    .required(),
  comments: Joi.string().min(8).max(200).required(),
  price: Joi.string()
    .pattern(/^[1-9]\d*(\.\d+)?$/, "Should no begin from 0, only if 0.99")
    .required(),
});

// Joi.array().items(Joi.string().required(), Joi.string().required());
