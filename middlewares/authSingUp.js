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



const verifySignUp = {
  checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;