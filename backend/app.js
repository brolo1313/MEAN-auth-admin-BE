const express = require("express");
const path = require("path");
const morgan = require("morgan");
const chalk = require("chalk");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors')
require('dotenv').config();

app.use(cors());

const homeRoutes = require("./routes/home-routes");
const apiPlanRoutes = require("./routes/api-plan-routes")


const createPath = require("./ejs-view/helpers/helper");

const errorMsg = chalk.bgKeyword('white').redBright;
const successMsg = chalk.bgKeyword('green').white;

const PORT = process.env.PORT || 4200; 

app.set("view engine", "ejs");

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then((res) => console.log(successMsg("Connected to DB")))
  .catch((error) => console.log(errorMsg('BD not connected',error)));

// Start the server
app.listen(PORT, (error) => {
  error
    ? console.log(errorMsg(error))
    : console.log(successMsg(`Server listens on https//localhost:${PORT}`));
});

//MIDDLEWARE
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(express.static(path.join(__dirname, "./ejs-view/helpers/data.json")));
app.use(express.static(path.join(__dirname, "styles")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // Parse JSON request body

//ROUTES
app.use(homeRoutes);
//API
app.use(apiPlanRoutes);


app.use((req, res) => {
  res.status(404).render(createPath("error"));
});


module.exports = app;