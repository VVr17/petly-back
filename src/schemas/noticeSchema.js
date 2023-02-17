import Joi from "joi";

export const noticeSchema = Joi.object({
  title: Joi.string().min(2).max(48).required(),
  photoURL: Joi.string(),
  name: Joi.string().min(2).max(16),
  breed: Joi.string().min(2).max(24),
  sex: Joi.string().required(),
  birthdate: Joi.date(),
  location: Joi.string().required(),
  comments: Joi.string().min(8).max(120),
});

export const noticeSellSchema = Joi.object({
  title: Joi.string().min(2).max(48).required(),
  photoURL: Joi.string(),
  name: Joi.string().min(2).max(16),
  breed: Joi.string().min(2).max(24),
  sex: Joi.string().required(),
  birthdate: Joi.date(),
  location: Joi.string().required(),
  comments: Joi.string().min(8).max(120),
  price: Joi.number().greater(0).required(),
});

// Joi.array().items(Joi.string().required(), Joi.string().required());
