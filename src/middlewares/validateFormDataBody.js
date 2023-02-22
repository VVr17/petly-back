import createError from "http-errors";
import formidable from "formidable";

export const validateFormDataBody = (schema) => (req, res, next) => {
  const form = formidable({ multiples: true });

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(400).json({ error: "Invalid form data" });
    } else {
      const { name, birthDate, breed, comments } = fields;
      const { error } = schema.validate({
        name,
        birthDate,
        breed,
        comments,
      });

      if (error) {
        // res.status(400).json({ error: error.details[0].message });
        next(new createError(400, error.message));
      } else {
        // Your code to handle valid form-data goes here
        next();
      }
    }
  });

  // if (error) {
  //   next(new createError(400, error.message));
  // }

  next();
};
