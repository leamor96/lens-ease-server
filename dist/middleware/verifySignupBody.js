import _ from "underscore";
import { userSignUpSchema } from "../validators/users.js";
var validateSignUp = function (req, res, next) {
    var body = _.pick(req.body, "username", "email", "password");
    var error = userSignUpSchema.validate(body).error;
    if (error) {
        var validationErrors = error.details.map(function (ed) { return ed.message; });
        return res.status(400).json({
            message: "Validation Failed",
            errors: validationErrors,
        });
    }
    next();
};
export { validateSignUp };
