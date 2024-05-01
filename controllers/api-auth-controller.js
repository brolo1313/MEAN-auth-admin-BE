const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/user");
const Profile = require("../models/profile");
const jwt = require("jsonwebtoken");

const getUsers = (req, res, next) => {
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
      next(error);
    });
};

const signUp = async (req, res, next) => {
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
      title: "",
      bio: "",
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
    );

    res.status(200).json(createdUser);
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });

    // Check if the user exists and has a password
    if (!user || !user.password) {
      return res.status(400).send({
        accessToken: null,
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).send({
        accessToken: null,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 3600,
    });

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      roles: user.roles,
      accessToken: token,
      expiresIn: 3600,
    });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
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
    next(error);
  }
};
module.exports = {
  getUsers,
  signUp,
  signIn,
  resetPassword,
};
