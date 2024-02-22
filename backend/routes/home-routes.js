const express = require("express");
const router = express.Router();

const { homePage } = require("../controllers/home-controller");

router.get(["/", "/home"], homePage);

module.exports = router;
