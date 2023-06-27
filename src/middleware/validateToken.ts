import jwt from "jsonwebtoken";
import { RequestHandler } from "express";
import authConfig from "../db/config/auth.config.js"; 

const validateToken: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {  
    return res.status(403).json({ message: "No Token Provided" });
  }

  jwt.verify(token, authConfig.secret, (err, payload: { id: string }) => {
    if (err) {
      return res.status(403).json({ message: "Invalid Token" });
    }
    const id = payload.id;
    req.userId = id;
    next();
  });
};

export { validateToken };
