const express = require("express");
const path = require("path");
const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/user");
const Plan = require("./models/plan");

const createPath = require("./ejs-view/helpers/helper");

const host = "localhost";
const port = process.env.PORT || 4200;
const DB = "mongodb+srv://brolo:pass1234@cluster0.5keofok.mongodb.net/";

app.set("view engine", "ejs");

// Connect to MongoDB
mongoose
  .connect(DB)
  .then((res) => console.log("Connected to DB"))
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
  const title = "Home Page";

  res.render(createPath("homepage"), { title });
});

app.get(["/plans"], (req, res) => {
  Plan.find()
    .then((planList) => res.send(planList))
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});

app.delete("/plans/:id", (req, res) => {
  Plan.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
      res.render(createPath("error"), { title: "Error" });
    });
});

app.get("/login", (req, res) => {
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

app.post("/add-plan", (req, res) => {
  // Access the data sent from the client-side form
  const { title, details, link, coverImage, logoImage } = req.body;

  const plan = new Plan({ title, details, link, coverImage, logoImage });
  plan
    .save()
    .then((result) => res.status(200).send(result))
    .catch((error) => {
      console.log(error);
    });
});

app.put("/update-plan/:id", (req, res) => {
  const { title, details, link, coverImage, logoImage } = req.body;

  const { id } = req.params;

  Plan
    .findByIdAndUpdate(id, {title, details, link, coverImage, logoImage })
    .then((result) => res.status(200).send(result))
    .catch((error) => {
      console.log(error);
    });
});

app.use((req, res) => {
  res.status(404).render(createPath("error"));
});
