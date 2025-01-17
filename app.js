const express = require("express");
const path = require("path");
const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDB = require("./utils/db");
const chalk = require("chalk");

const errorMsg = chalk.bgKeyword("white").redBright;
const successMsg = chalk.bgKeyword("green").white;

const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: ["http://localhost:4202", "http://localhost:4201", "https://mean-sand-box-fe.vercel.app", "https://education-io.vercel.app", "http://192.168.31.60:3001", "https://react-authorization-bounty.vercel.app"],
};

app.use(cors(corsOptions));

const apiPlanRoutes = require("./routes/api-plan-routes");
const apiAuthRoutes = require("./routes/api-auth-routes");
const apiProfileRoutes = require("./routes/api-profile-routes");
const apiGoogleRoutes = require("./routes/api-google-routes");
connectDB();

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
app.use(express.static(path.join(__dirname, "dist/browser")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // Parse JSON request body

//API
app.use(apiGoogleRoutes);
app.use(apiPlanRoutes);
app.use(apiAuthRoutes);
app.use(apiProfileRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint not found' });
});


// 👇 add a global error handler after all the routes.
app.use((err, req, res, next) => {
  err.statusCode = err?.statusCode || 500;
  err.code = err?.code || null;
  err.originalError = err?.originalError || 'Internal Server Error';

  const errorResponse = {
    status: err.statusCode,
    code: err.code,
    message: err.message,
    originalError: err.originalError
  };

  res.status(err.statusCode).json(errorResponse);
});

module.exports = app;
