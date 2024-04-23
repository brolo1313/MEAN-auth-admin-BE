const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/user");
const Profile = require("../models/profile");
const jwt = require("jsonwebtoken");

const expiresIn = 3600;
const secretKey = process.env.SECRET_KEY || "default-secret-key";

const errorHandler = (res, error) =>
  res.status(500).json({
    app_err_default: {
      notification: "Помилка сервера",
      code: 10000,
      message: "Default Error",
    },
  });

const nativeError = (res, error) => res.status(500).json({ message: error.message || 'Internal server error' });

const getUsers = (req, res) => {
  User.find()
    .then((users) => {
      const usersWithoutPassword = users.map((user) => {
        const { password, __v, email, ...userWithoutPassword } =
          user.toObject();
        return userWithoutPassword;
      });

      res.status(200).json(usersWithoutPassword);
    })
    .catch((error) => {
      errorHandler(res);
    });
};

const signUp = async (req, res) => {
  const { username, email, password, role = "user" } = req.body;

  const user = new User({
    username,
    email,
    password: bcrypt.hashSync(password, 8),
    role,
  });

  try {
    const createdUser = await user.save();

    if (!createdUser) {
      return res.status(400).send({
        message: "Couldn't write user in DB",
      });
    }

    const profile = new Profile({
      user: createdUser._id,
      name: username,
      title: '',
      bio: '',
      role: createdUser.role,
      profilePics: "",
      links: {
        website: "",
        facebook: "",
        twitter: "",
        github: "",
      },
      posts: [],
    });

    const createdProfile = await profile.save();

    if (!createdProfile) {
      return res.status(400).send({
        message: "Couldn't write profile in DB",
      });
    }

    await User.findOneAndUpdate(
      { _id: createdUser._id },
      { $set: { profile: createdProfile._id } }
  )

    res.status(200).json(createdUser);
  } catch (error) {
    console.log('error',error);
    return nativeError(res, error);
  }
};

const signIn = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    const user = await User.findOne({ username });
    // Check if the user exists and has a password
    if (!user || !user.password) {
      return res.status(400).send({
        accessToken: null,
        message: "Invalid login or password",
      });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).send({
        accessToken: null,
        message: "Invalid login or password",
      });
    }

    const token = jwt.sign({ id: user.id }, secretKey, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: expiresIn,
    });

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      roles: user.roles,
      accessToken: token,
      expiresIn,
    });
  } catch (error) {
    console.error("Error in signIn function:", error);
    return nativeError(res, error);
  }
};

const resetPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send({
      message: "Email address is required",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({
        message: "Email address not found",
      });
    }

    const randomString = Math.random().toString(36).slice(-8);
    const filter = { email: user.email };
    const update = {
      password: bcrypt.hashSync(randomString, 8),
    };

    const userUpdated = await User.findOneAndUpdate(filter, update);

    if (!userUpdated) {
      return res.status(400).send({
        message: "Password wasn't updated",
      });
    }

    const isSentEmail = await sendEmail(
      user.email,
      "Password reset",
      randomString,
      user.username
    );

    console.log("isSentEmail", isSentEmail);

    if (isSentEmail) {
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        message: "Password was send to your email",
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: "Failed to reset password. Please try again later.",
    });
  }
};
module.exports = {
  getUsers,
  signUp,
  signIn,
  resetPassword,
};
