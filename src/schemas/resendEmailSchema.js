import Joi from "joi";

export const resendEmailSchema = Joi.object({
  email: Joi.string()
    .regex(
      /^(?=.{1,63}$)(?=.{2,}@)[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address"
    )
    .required()
    .min(12)
    .max(63),
});
