const express = require("express");
const router = express.Router();
const { verifySignUp } = require("../middlewares");

const { getUsers, createUser } = require("../controllers/api-auth-controller");


router.get("/api/getAllUsers", getUsers);
router.post(
  "/api/user",
  verifySignUp.checkDuplicateUsernameOrEmail,
  createUser
);

module.exports = router;
