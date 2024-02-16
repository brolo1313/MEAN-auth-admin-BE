const express = require("express");
const path = require("path");

const app = express();


app.set('view engine', 'ejs');

const host = "localhost";
const port = 7000;

const createPath = (page) => path.resolve(__dirname, "ejs-view", `${page}.ejs`);

app.listen(port, host, (error) => {
  error
    ? console.log(error)
    : console.log(`Server listens http://${host}:${port}`);
});


app.get(["/", "/home"], (req, res) => {
  res.render(createPath("homepage"));
});

app.get("/login", (req, res) => {
    res.render(createPath("login"));
  });

app.use((req, res) => {
  res.status(404).render(createPath("error"));
});
