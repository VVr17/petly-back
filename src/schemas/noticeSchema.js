import Joi from "joi";

export const noticeSchema = Joi.object({
  title: Joi.string().min(2).max(48).required(),
  name: Joi.string().min(2).max(16),
  breed: Joi.string().min(2).max(24),
  image: Joi.string(),
  sex: Joi.string(),
  price: Joi.number().greater(0),
  birthdate: Joi.date(),
  location: Joi.string(),
  comments: Joi.string().min(8).max(120).required(),
});

export const noticeSellSchema = Joi.object({
  title: Joi.string().min(2).max(48).required(),
  name: Joi.string().min(2).max(16),
  breed: Joi.string().min(2).max(24),
  image: Joi.string(),
  sex: Joi.string(),
  birthdate: Joi.date(),
  location: Joi.string(),
  comments: Joi.string().min(8).max(120).required(),
  price: Joi.number().greater(0).required(),
});
