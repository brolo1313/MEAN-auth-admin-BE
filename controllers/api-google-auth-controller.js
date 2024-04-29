const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Profile = require("../models/profile");
const jwt = require("jsonwebtoken");

const passport = require('passport');
require('../middlewares/passport');

const expiresIn = 3600;
const secretKey = process.env.SECRET_KEY || "default-secret-key";


const  handleGoogleAuth = async (req, res) => {
    // Handle req.body validation and return 400 error if validation failed
    // Then check if user exists in Database
  
    // If user does not exist, create new user and return token
    // The code below shows only how to return token and user object from Google
    try {
      if (req.user) {
        const token = await jwt.sign(req.user, process.env.SECRET_KEY);
        const { email } = req.user;
        const responseObject = {
            accessToken: token,
            email
        };
        
        // Convert the responseObject to JSON
        const userData = JSON.stringify(responseObject);
        
        // Construct the redirect URL with the userData as a query parameter
        const redirectUrl = `http://localhost:4202/login?userData=${encodeURIComponent(userData)}`;
        
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
