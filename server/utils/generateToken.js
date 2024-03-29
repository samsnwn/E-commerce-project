import jwt from "jsonwebtoken";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const createSendToken = (user, statusCode, res) => {
  const accessToken = signToken(user._id);

  const cookieOptions = {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  };

  // Remove password from the output
  user.password = undefined;
  
  res.cookie("jwt", accessToken, cookieOptions);
  res
    .status(statusCode)
    .json({ status: "success", data: { id:user._id, email:user.email, name: user.name, isAdmin:user.isAdmin } });
};

