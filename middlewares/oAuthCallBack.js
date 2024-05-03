const User = require("../models/user");
const bcrypt = require("bcryptjs");
const Profile = require("../models/profile");
const sendEmail = require("../utils/sendEmail");

const userAuth = async (req, res, next) => {
  const { idToken, ...profile } = req.body;
  try {
    const existingUserByEmail = await User.findOne({ email: profile.email });
    const existingUserByGoogleId = await User.findOne({
      "google.id": profile.id,
    });

    if (existingUserByEmail && !existingUserByGoogleId) {
      existingUserByEmail.google = {
        id: profile.id,
        email: profile.email,
      };
      await existingUserByEmail.save();

      res.locals.userData = {
        ...existingUserByEmail,
      };
      next();
    }

    if (!existingUserByEmail && !existingUserByGoogleId) {
      // create new User by google id and email
      const newUser = new User({
        username: "newUser",
        email: profile.email,
        password: bcrypt.hashSync(process.env.DEFAULT_PASSWORD, 8),
        role: "user",
        google: {
          id: profile.id,
          email: profile.email,
        },
      });

      await newUser.save();

      const newProfile = new Profile({
        user: newUser._id,
        name: newUser.username,
        title: "",
        bio: "",
        role: newUser.role,
        profilePics: "",
        links: {
          website: "",
          facebook: "",
          twitter: "",
          github: "",
        },
        posts: [],
      });

      const createdProfile = await newProfile.save();

      await User.findOneAndUpdate(
        { _id: newUser._id },
        { $set: { profile: createdProfile._id } }
      );

      await sendEmail(
        newUser.email,
        "Your credentials",
        process.env.DEFAULT_PASSWORD,
        newUser.username
      );

      res.locals.userData = {
        ...newUser,
      };
      next();
    }

    if (existingUserByEmail && existingUserByGoogleId) {
      res.locals.userData = {
        ...existingUserByEmail,
      };
      next();
    }
  } catch (err) {
    next(err);
  }
};

const verifyGoogleSingIn = {
  userAuth,
};

module.exports = verifyGoogleSingIn;
