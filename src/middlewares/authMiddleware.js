import createError from "http-errors";
import jwt from "jsonwebtoken"; // JWT

export const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new createError(401, "Authorization required");

    const [type, token] = authorization.split(" ");
    if (!type) throw new createError(401, "Token type invalid");
    if (!token) throw new createError(401, "Authorization token required");

    // TODO: add JWT validation

    next();
  } catch (error) {
    //TODO: add JWT error
    next(error);
  }
};
