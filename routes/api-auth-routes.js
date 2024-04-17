const express = require("express");
const router = express.Router();
const { verifySignUp } = require("../middlewares");
const { bearerToken } = require("../middlewares");

const { getUsers, signUp, signIn } = require("../controllers/api-auth-controller");


router.get("/api/getAllUsers", bearerToken.verify, getUsers);

router.post(
  "/api/sign-up",
  verifySignUp.checkDuplicateUsernameOrEmail,
  verifySignUp.checkValidation,
  signUp
);

router.post("/api/sign-in", signIn);

module.exports = router;
