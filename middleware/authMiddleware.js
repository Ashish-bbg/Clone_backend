import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  const token = req.cookies.token;

  // token coming from authorization header
  if (!token)
    return res.status(401).json({
      message: "Unauthorized: Token missing",
    });

  try {
    // verify token with secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({
      message: "Not authorized, Invalid token",
    });
  }
};
