const path = require("path");

const createPath = (page) => path.resolve(__dirname, "../../ejs-view", `${page}.ejs`);

module.exports = createPath;