const express = require("express");
const router = express.Router();
const passport = require('passport');
require('../middlewares/passport');

const { handleGoogleAuth  } = require("../controllers/api-google-auth-controller");



// router.get("/api/auth/google",  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get("/api/auth/google/callback", passport.authenticate('google', { failureRedirect: 'http://localhost:3000/api/auth/google/callback', session: false  ,  scope: ['email']}),handleGoogleAuth )

module.exports = router;
