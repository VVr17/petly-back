import Joi from "joi";

export const googleAuthUserSchema = Joi.object({
  email: Joi.string()
    .regex(
      /^(?=.{1,63}$)(?=.{2,}@)[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address"
    )
    .required()
    .min(12)
    .max(63),
  name: Joi.string()
    .min(3)
    .max(32)
    .regex(
      /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?: [a-zA-Zа-яА-ЯіІїЇґҐ]+)*$/,
      "Only letters can be accepted"
    )
    .required(),
  photoURL: Joi.string(),
});
