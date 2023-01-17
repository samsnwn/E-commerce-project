const jwt = require("jsonwebtoken");
const ExpressError = require("../utils/ExpressError");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
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
    if (req.user.id === req.params.userId || req.user.isAdmin) {
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



module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };
