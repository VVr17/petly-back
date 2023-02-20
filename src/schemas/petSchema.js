import Joi from "joi";

export const petSchema = Joi.object({
  name: Joi.string().min(2).max(16).alphanum().required(),
  birthDate: Joi.string().required(),
  breed: Joi.string().min(2).max(16).alphanum().required(),
  comments: Joi.string().min(8).max(120),
  photoURL: Joi.string().uri().required(),
});
