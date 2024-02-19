const express = require("express");
const path = require("path");
const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/user")

const homeMocksData = require("./ejs-view/helpers/mocks");
const createPath = require("./ejs-view/helpers/helper");

const host = "localhost";
const port = 7000;
const DB = 'mongodb+srv://brolo:pass1234@cluster0.5keofok.mongodb.net/';

app.set("view engine", "ejs");

// Connect to MongoDB
mongoose
  .connect(DB)
  .then((res) => console.log('Connected to DB'))
  .catch((error) => console.log(error));

  // Start the server
app.listen(port, host, (error) => {
  error
    ? console.log(error)
    : console.log(`Server listens http://${host}:${port}`);
});

//MIDDLEWARE
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(express.static(path.join(__dirname, "./ejs-view/helpers/data.json")));
app.use(express.static(path.join(__dirname, "styles")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // Parse JSON request body

//API
app.get(["/", "/home"], (req, res) => {
  const homeMocks = homeMocksData;
  const title = "Home Page";

  res.render(createPath("homepage"), { homeMocks, title });
});

app.get("/login", (req, res) => {
  res.render(createPath("login"), { title: "Login Page" });
});

app.get("/data.json", (req, res) => {
  res.sendFile(path.join(__dirname, "./ejs-view/helpers/data.json"));
});

app.post("/add-title", (req, res) => {
  console.log('req add-title',req.body);
  const { name, description } = req.body;
  const pageTitle = {
    id: new Date(),
    date: new Date().toLocaleDateString(),
    name,
    description,
  };
  res.send(pageTitle);
});

app.use((req, res) => {
  res.status(404).render(createPath("error"));
});
