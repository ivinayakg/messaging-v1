const jwt = require("jsonwebtoken");

const createToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization || undefined;
  if (!token) {
    throw new Error("provide a valid token");
  }
  jwt.verify(token, process.env.JWT_SECRET, function (err, data) {
    if (err) {
      throw new Error("Token has Expired");
    } else {
      req.user = data;
      next();
    }
  });
};

const socketAuthMiddleware = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  createToken,
  authMiddleware: verifyToken,
  socketAuthMiddleware,
};
