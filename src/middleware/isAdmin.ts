import { RequestHandler } from "express";
import { User } from "../db/models/user.js";
const isAdmin: RequestHandler = async (req, res, next) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    if (!user.isAdmin) {
      return res.status(401).json({ message: "Requires Admin Role" });
    }
    next();
  } catch (e) {
    return res.status(500).json({ message: "Requires Admin Role", error: e });
  }
};

export { isAdmin };
