import Joi from "joi";

export const userSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    .required()
    .min(10)
    .max(63),
  password: Joi.string()
    .min(7)
    .max(32)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "minimum seven characters, at least one uppercase letter, one lowercase letter and one number"
    )
    .required(),
  city: Joi.string()
    .min(4)
    .regex(
      /^\s*(?:\w+\s*,\s*){1,}(?:\w+\s*)$/,
      "at least two words separated by string"
    )
    .required(),
  phone: Joi.string()
    .min(13)
    .max(13)
    .regex(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      "match +380123456789"
    )
    .required(),
  name: Joi.string().min(4).required(),
});
