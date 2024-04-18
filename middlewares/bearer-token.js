const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY || 'default-secret-key';
const verify = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (!bearerHeader || !bearerHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  const token = bearerHeader.split(" ")[1];

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Attach the decoded token to the request object
    req.decoded = decoded;

    // Proceed to the next middleware function
    next();
  });
};

const bearerToken = {
  verify,
};

module.exports = bearerToken;
