import Joi from "joi";

export const petSchema = Joi.object({
    name: Joi.string().min(2).max(16).alphanum(),
    birthDate: Joi.string(),
    breed: Joi.string().min(2).max(16).alphanum(),
    comments: Joi.string().min(8).max(120),
});