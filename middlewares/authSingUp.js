const User = require("../models/user");

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Check for duplicate username
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(400).send({ message: "Username is already in use!" });
    }

    // Check for duplicate email
    const existingEmail = await User.findOne({ email: req.body.email });
    if (existingEmail) {
      return res.status(400).send({ message: "Email is already in use!" });
    }

    // If no duplicates found, proceed to next middleware
    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const checkValidation = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const minUsernameLength = 3;
    const minPasswordLength = 8;

    if (!username || username.length < minUsernameLength) {
      return res.status(400).send({
        message: `Username must be at least ${minUsernameLength} characters long.`,
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).send({
        message: "Please provide a valid email address.",
      });
    }

    if (!password || password.length < minPasswordLength) {
      return res.status(400).send({
        message: `Password must be at least ${minPasswordLength} characters long.`,
      });
    }
    // If all validations pass, proceed to next middleware
    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkValidation
};

module.exports = verifySignUp;
