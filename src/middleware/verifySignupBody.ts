import { RequestHandler } from "express";
import _ from "underscore";
import { userSignUpSchema } from "../validators/users.js"; 

const validateSignUp: RequestHandler = (req, res, next) => {
  const body = _.pick(req.body, "username", "email", "password");

  const { error } = userSignUpSchema.validate(body);

  if (error) {
    const validationErrors = error.details.map((ed) => ed.message);
    return res.status(400).json({
      message: "Validation Failed",
      errors: validationErrors,
    });
  }

  next();
};

export { validateSignUp };
