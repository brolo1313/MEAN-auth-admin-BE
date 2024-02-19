const express = require("express");
const path = require("path");
const morgan = require("morgan");
const app = express();

const homeMocksData = require("./ejs-view/helpers/mocks");
const createPath = require("./ejs-view/helpers/helper");

const host = "localhost";
const port = 7000;

app.set("view engine", "ejs");

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

app.use((req, res) => {
  res.status(404).render(createPath("error"));
});
