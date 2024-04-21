const express = require("express");
const router = express.Router();
const { bearerToken } = require("../middlewares");

const {
  updateProfilePassword,
} = require("../controllers/api-profile-controller");

router.put("/api/change-password",bearerToken.verify, updateProfilePassword);


module.exports = router;
