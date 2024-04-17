//Verify Token
const verify = (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if(!bearerHeader) {
        return res.status(401).send({ message: 'You are unauthorized' });
    }
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      //Get token from string
      const bearerToken = bearer[1];

      //set the token
      req.token = bearerToken;

      //next middleweare
      next();
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const bearerToken = {
    verify,
};

module.exports = bearerToken;
