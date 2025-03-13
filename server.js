const http = require("http");

const bookController = require("./controller/bookController");
const userController = require("./controller/userController");
const rentControoler = require("./controller/rentController");

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method == "GET" && url == "/api/users") {
    userController.getAll(req, res);
  } else if (method == "GET" && url == "/api/books") {
    bookController.getAll(req, res);
  } else if (method == "DELETE" && req.url.startsWith("/api/books")) {
    bookController.removeOne(req, res);
  } else if (method == "POST" && url == "/api/books") {
    bookController.addOneBook(req, res);
  } else if (method == "PUT" && url.startsWith("/api/books/back")) {
    bookController.backOneBook(req, res);
  } else if (method == "PUT" && url.startsWith("/api/books")) {
    bookController.updateOneBook(req, res);
  } else if (method == "POST" && url == "/api/users") {
    userController.addOneUser(req, res);
  } else if (method == "PUT" && url.startsWith("/api/users/upgrade")) {
    userController.upgradeOneUser(req, res);
  } else if (method == "PUT" && url.startsWith("/api/users")) {
    userController.submitCrimeOneUser(req, res);
  } else if (method == "POST" && url == "/api/users/login") {
    userController.loginOneUser(req, res);
  } else if (method == "POST" && url == "/api/books/rent") {
    rentControoler.rentOneBook(req, res);
  }
});

server.listen(3000, () => {
  console.log("Server Runnig On Port 3000");
});
