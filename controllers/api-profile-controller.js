const User = require("../models/user");
const bcrypt = require("bcryptjs");

const updateProfilePassword = async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const { id } = req.params;

  try {
    const user = await User.findOne(id);

    if (!user) {
      return res.status(400).send({
        message: "Couldn't find user",
      });
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
    return res.status(500).send({
      message: error,
    });
  }
};

module.exports = {
  updateProfilePassword,
};
