const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../middlewares/passport");

const { verifyGoogleSingIn } = require("../middlewares");
const {
  handleGoogleAuth,
} = require("../controllers/api-google-auth-controller");

// router.get("/api/auth/google",  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.post(
  "/api/auth/google/callback",
  verifyGoogleSingIn.userAuth,
  handleGoogleAuth
);

module.exports = router;
