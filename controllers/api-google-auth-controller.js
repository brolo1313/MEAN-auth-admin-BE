const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const passport = require("passport");
require("../middlewares/passport");

const handleGoogleAuth = async (req, res) => {
  //   if (req.user.error) {
  //     const responseObject = {
  //       message: req.user.error
  //     };

  //     const data = JSON.stringify(responseObject);
  //     const redirectUrl = `http://localhost:4202/login?error=${encodeURIComponent(
  //       data
  //     )}`;
  //     return res.redirect(redirectUrl);
  //   }

  // If user does not exist, create new user and return token
  // The code below shows only how to return token and user object from Google
  try {
    if (req.user) {
      const token = jwt.sign({ id: req.user._id }, process.env.SECRET_KEY, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: process.env.EXPIRES_IN,
      });

      const responseObject = {
        expiresIn: process.env.EXPIRES_IN,
        accessToken: token,
        id:  req.user._id,
        username:  req.user.username,
        email: req.user.email,
        roles: req.user.role,
      };

      // Convert the responseObject to JSON
      const userData = JSON.stringify(responseObject);

      // Construct the redirect URL with the userData as a query parameter
      const redirectUrl = `https://mean-sand-box-fe.vercel.app/login?userData=${encodeURIComponent(
        userData
      )}`;

      // Redirect the user to the Angular client with the redirect URL
      return res.redirect(redirectUrl);
    }
  } catch (error) {
    console.log(error);
  }
  // If user exists, find user, create token, and send to client
};

module.exports = {
  handleGoogleAuth,
};
