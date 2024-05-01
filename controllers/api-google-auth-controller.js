const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const passport = require("passport");
require("../middlewares/passport");


const handleGoogleAuth = async (req, res) => {

    console.log('google auth callback', req);
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
      
    const token = jwt.sign(req.user, process.env.SECRET_KEY, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: process.env.EXPIRES_IN,
      });
      const { email } = req.user;
      const responseObject = {
        expiresIn: process.env.EXPIRES_IN,
        accessToken: token,
        ...req.user,
      };

      // Convert the responseObject to JSON
      const userData = JSON.stringify(responseObject);

      // Construct the redirect URL with the userData as a query parameter
      const redirectUrl = `http://localhost:4202/login?userData=${encodeURIComponent(
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
