const jwt = require("jsonwebtoken");

const handleGoogleAuth = async (req, res) => {
  const { idToken, ...googleProfile } = req.body;
  const userData = res.locals.userData;
  try {
    if (userData._doc) {
      const token = jwt.sign(
        { id: userData._doc._id },
        process.env.SECRET_KEY,
        {
          algorithm: "HS256",
          allowInsecureKeySizes: true,
          expiresIn: 3600,
        }
      );

      const responseObject = {
        expiresIn: 3600,
        accessToken: token,
        id: userData._doc._id,
        username: userData._doc.username,
        email: userData._doc.email,
        roles: userData._doc.role,
      };

      res.status(200).send(responseObject);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleGoogleAuth,
};
