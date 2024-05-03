const verifySignUp = require("./authSingUp");
const bearerToken = require("./bearer-token");
const verifyGoogleSingIn = require("./oAuthCallBack");



module.exports = {
  verifySignUp,
  bearerToken,
  verifyGoogleSingIn
};