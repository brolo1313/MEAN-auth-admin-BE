const createPath = require("../ejs-view/helpers/helper");


const homePage = (req, res) => {
  const title = "Home Page";

  res.render(createPath("homepage"), { title });
};

const loginPage = (req, res) => {
  const title = "Home Page";

  res.render(createPath("login"), { title });
};

module.exports = {
  homePage,
  loginPage
};
