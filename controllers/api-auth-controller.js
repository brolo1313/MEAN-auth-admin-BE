const bcrypt = require("bcryptjs");

const User = require("../models/user");
const jwt = require("jsonwebtoken");

const expiresIn = 3600;

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

const signUp = (req, res) => {
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

const signIn = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .then((user) => {
      if (!user) {
        return res.status(400).send({ message: "User Not found." });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(400).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn, 
      });

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: user.roles,
        accessToken: token,
        expiresIn,
      });
    })
    .catch((error) => {
      nativeError(res, error);
      console.log('error', error);
    });
};

module.exports = {
  getUsers,
  signUp,
  signIn,
};
