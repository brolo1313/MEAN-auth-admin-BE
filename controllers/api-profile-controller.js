const bcrypt = require("bcryptjs");
const Profile = require("../models/profile");
const User = require("../models/user");
const { AppError } = require("../helpers/errors");

const updateProfilePassword = async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const { id } = req.query;

  try {
    const user = await User.findById(id);

    if (!user) {
      throw new AppError(
        "Couldn't find user",
        500,
        1000,
      );
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({
        message: "Old password is incorrect",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).send({
        message: "New password and confirm password do not match",
      });
    }

    if (newPassword.length < 8 || confirmPassword.length < 8) {
      return res.status(400).send({
        message: "New password and confirm password less then 8 characters",
      });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedNewPassword;
    await user.save();

    return res.status(200).send({
      message: "Password updated successfully",
      username: user.username,
      email: user.email,
      role: user.role
    });
   
  } catch (error) {
    next(error);
  }
};


const getAllProfiles = (req, res, next) => {
  Profile.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      next(error);
    });
};
module.exports = {
  updateProfilePassword,
  getAllProfiles,
};
