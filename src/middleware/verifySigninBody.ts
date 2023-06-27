import { RequestHandler } from "express";
import _ from "underscore";
import { userSignInSchema } from "../validators/users.js"; 

const validateSignIn: RequestHandler = (req, res, next) => {
  const body = _.pick(req.body, "email", "password");

  const { error } = userSignInSchema.validate(body);

  if (error) {
   const validationErrors = error.details.map((ed) => ed.message);
   return res.status(400).json({
     message: "Validation Failed",
     errors: validationErrors,
   });
  }

  next();
};

export { validateSignIn };
