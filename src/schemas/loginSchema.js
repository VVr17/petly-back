import Joi from "joi";

export const loginSchema = Joi.object({
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
});
