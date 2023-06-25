import jwt from "jsonwebtoken";
import authConfig from "../db/config/auth.config.js";
var validateToken = function (req, res, next) {
    var token = req.headers.authorization;
    if (!token) {
        return res.status(403).json({ message: "No Token Provided" });
    }
    jwt.verify(token, authConfig.secret, function (err, payload) {
        if (err) {
            return res.status(403).json({ message: "Invalid Token" });
        }
        var id = payload.id;
        req.userId = id;
        next();
    });
};
export { validateToken };
