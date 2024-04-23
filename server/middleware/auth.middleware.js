import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import User from "../models/auth.model.js";

const protect = expressAsyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userID).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized, No Token");
  }
});

const protectAdmin = expressAsyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;

  if (!token) return res.status(401).json({ message: "Not Authenticated" });

  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) return res.status(403).json({ message: "Token is not Valid!" });
    if (payload.role !== "admin")
      return res.status(403).json({ message: "Not Authorized!" });
  });
  next();
});

export { protect, protectAdmin };
