const fs = require("fs");
const path = require("path");

const http = require("http");

const host = "localhost";
const port = 7000;

const server = http.createServer(function (req, res) {
  res.setHeader("Content-Type", "text/html");

  const createPath = (page) => path.resolve(__dirname, "views", `${page}.html`);
  let basePath = '';

  switch (req.url) {
    case "/":
      basePath = createPath("homepage");
      break;

    default:
      basePath = createPath("error");
      res.statusCode = 404;
      break;
  }


  console.log(basePath);
  fs.readFile(basePath, (err, data) => {
    if (err) {
      console.log(err);
      res.statusCode = 500;
      res.end();
    } else {
      res.write(data);
      res.end();
    }
  });
});

server.listen(port, host, (error) => {
  error
    ? console.log(error)
    : console.log(`Server listens http://${host}:${port}`);
});
