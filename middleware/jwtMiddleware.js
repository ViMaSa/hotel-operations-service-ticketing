const User = require("../models/user");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET;
const TOKEN_EXPIRATION = process.env.JWT_EXPIRES_IN;

const checkJwt = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Failed to authenticate token." });
    }

    req.user = decoded;

    next();
  });
};

const createToken = (userId) => {
  return jwt.sign({ userId }, SECRET_KEY, {
    expiresIn: TOKEN_EXPIRATION
  });
};

const refreshToken = (token) => {
  if (!token) {
    return {
      status: 401,
      message: "No token provided."
    }
  }

  const decodedToken = jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if(err) {
      return {
        status: 401,
        message: "Failed to verify token."
      }
    }

    return decoded;
  });

  const now = Date.now();
  const tokenExpiration = decodedToken.exp * 1000;
  if(tokenExpiration < now) {
    return {
      status: 401,
      message: "Token has expired."
    }
  }


  return {
    status: 200,
    token: createToken(decodedToken.userId)
  }
};

module.exports =
{
  checkJwt,
  createToken,
  refreshToken
};
