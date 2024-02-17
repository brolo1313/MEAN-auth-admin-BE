const express = require("express");
const path = require("path");
const morgan = require("morgan");
const app = express();

const homeMocks = require("./ejs-view/helpers/mocks");
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
app.use(express.static(path.join(__dirname, "styles")));

//API
app.get(["/", "/home"], (req, res) => {
  res.render(createPath("homepage"), { homeMocks: homeMocks });
});

app.get("/login", (req, res) => {
  res.render(createPath("login"));
});

app.use((req, res) => {
  res.status(404).render(createPath("error"));
});
