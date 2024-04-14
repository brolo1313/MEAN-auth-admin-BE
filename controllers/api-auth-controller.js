const bcrypt = require("bcryptjs");

const Plan = require("../models/plan");
const User = require("../models/user");
const { verifySignUp } = require("../middlewares");

const errorHandler = (res, error) =>
  res.status(500).json({
    app_err_default: {
      notification: "Помилка сервера",
      code: 10000,
      message: "Default Error",
    },
  });

const nativeError = (res, error) => res.status(500).json(error);

const getUsers = (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      errorHandler(res);
    });
};

const createUser = (req, res) => {
  const { username, email, password, role = "admin" } = req.body;


  const user = new User({
    username,
    email,
    password: bcrypt.hashSync(password, 8),
    role,
  });
  user
    .save()
    .then((createdUser) => res.status(200).json(createdUser))
    .catch((error) => {
      nativeError(res, error);
    });
};

module.exports = {
  getUsers,
  createUser,
};
