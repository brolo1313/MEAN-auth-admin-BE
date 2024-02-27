const express = require("express");
const router = express.Router();

const User = require("./models/user");


router.get("/login", (req, res) => {
    res.render(createPath("login"), { title: "Login Page" });
  });
  
  // app.post("/register", (req, res) => {
  //   res.render(createPath("login"), { title: "Login Page" });
  // });
  
  // app.post("/login", (req, res) => {
  //   console.log(res);
  // //   res.render(createPath("homepage"), { title: "Home Page" });
  // });
  
  // app.get("/data.json", (req, res) => {
  //   res.sendFile(path.join(__dirname, "./ejs-view/helpers/data.json"));
  // });
  

  module.exports = router;