import BaseJoi from "joi";
import JoiDate from "@joi/date";
const Joi = BaseJoi.extend(JoiDate);

export const petSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(16)
    .regex(/^[a-zA-Z]+$/, "Only letters can be accepted")
    .required(),
  birthDate: Joi.date().format("DD.MM.YYYY").required(),
  breed: Joi.string()
    .min(2)
    .max(16)
    .regex(/^[a-zA-Z]+$/, "Only letters can be accepted")
    .required(),
  comments: Joi.string().min(8).max(120),
  photoURL: Joi.string().uri().required(),
});
