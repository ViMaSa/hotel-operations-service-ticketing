const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET

const checkJwt = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Failed to authenticate token."});
    }

    req.user = decoded;

    next();
  });
}

module.exports = checkJwt;
