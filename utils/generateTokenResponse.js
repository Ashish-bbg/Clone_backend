import jwt from "jsonwebtoken";

export const generateTokenResponse = (res, user) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "strict",
    path: "/", // always attach to all routes
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
  };
};
