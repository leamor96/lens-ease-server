import _ from "underscore";
import { userSignInSchema } from "../validators/users.js";
var validateSignIn = function (req, res, next) {
    var body = _.pick(req.body, "email", "password");
    var error = userSignInSchema.validate(body).error;
    if (error) {
        var validationErrors = error.details.map(function (ed) { return ed.message; });
        return res.status(400).json({
            message: "Validation Failed",
            errors: validationErrors,
        });
    }
    next();
};
export { validateSignIn };
