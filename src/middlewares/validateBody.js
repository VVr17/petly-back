import createError from "http-errors";

export const validateBody = (schema) => (req, res, next) => {
  const data = !!req.file
    ? { ...req.body, imageFile: req?.file }
    : { ...req.body };

  const { error } = schema.validate(data);

  if (error) {
    next(new createError(400, error.message));
  }

  next();
};
