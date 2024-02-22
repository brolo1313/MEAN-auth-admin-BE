const express = require("express");
const router = express.Router();

const { homePage, loginPage } = require("../controllers/home-controller");


router.get(["/", "/home"], homePage);
router.get(["/", "/login"], loginPage);

module.exports = router;
