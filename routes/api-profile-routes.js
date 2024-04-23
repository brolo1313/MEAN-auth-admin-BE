const express = require("express");
const router = express.Router();
const { bearerToken } = require("../middlewares");

const {
  updateProfilePassword,
  getAllProfiles,
} = require("../controllers/api-profile-controller");

router.put("/api/change-password",bearerToken.verify, updateProfilePassword);
router.get("/api/all-profiles", bearerToken.verify, getAllProfiles);



module.exports = router;
