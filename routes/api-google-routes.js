const express = require("express");
const router = express.Router();

const { verifyGoogleSingIn } = require("../middlewares");
const {
  handleGoogleAuth,
} = require("../controllers/api-google-auth-controller");

router.post(
  "/api/auth/google/callback",
  verifyGoogleSingIn.userAuth,
  handleGoogleAuth
);

module.exports = router;
