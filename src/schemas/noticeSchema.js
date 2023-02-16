import Joi from "joi";

export const noticeSchema = Joi.object({
  title: Joi.string().min(2).max(48).required(),
  name: Joi.string().min(2).max(16),
  breed: Joi.string().min(2).max(24),
  birthdate: Joi.date(),
  location: Joi.string(),
  comments: Joi.string().min(8).max(120).required(),
  price: Joi.number().greater(0).required(),
  favorite: Joi.bool(),
});
