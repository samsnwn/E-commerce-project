const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const ExpressError = require("../utils/ExpressError");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");



exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  // 1) Getting token and check if exists

  if (!token) {
    res.status(401);
    throw new Error("You are not logged in.Please log in to get access");
  }

  try {
    //  2) Verification token
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET_KEY
    );

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id).select("-password");
    if (!currentUser) {
      res.status(401);
      throw new Error("The user does not longer exist!");
      // 4) Check if user changed password after token was issued
    } else if (currentUser.changedPasswordAfter(decoded.iat)) {
      res.status(401);
      throw new Error("User recently changed password. Please login again");
    }
    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
  } catch (err) {
    if(err.name === "TokenExpiredError") {
      res.status(401);
      throw new Error("Token expired!. Please log in again");
    } else {
      res.status(401);
      throw new Error("Invalid token!");
    }
  }
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ExpressError(
          "You do not have permission to perform this action!",
          403
        )
      );
    }
    next();
  };
};
