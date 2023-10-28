import jwt from "jsonwebtoken";
import ExpressError from "../utils/ExpressError.js";

const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        throw new ExpressError("Token is not valid!", 403);
      } else {
        req.user = user
      }
    });
    next()  
  } else {
    throw new ExpressError("You are not authenticated", 401);
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.userId || req.user.isAdmin || req.user.id === req.params.id) {
      next();
    } else {
      throw new ExpressError("You are not allowed", 403);
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      throw new ExpressError("You are not allowed", 403);
    }
  });
};



export { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };
