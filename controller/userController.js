const UserModel = require("../model/user");

const url = require("url");

const getAll = async (req, res) => {
  const users = await UserModel.find();
  res.writeHead(200, { "content-type": "application/json" });
  res.end(JSON.stringify(users));
};

const addOneUser = async (req, res) => {
  let user = "";

  req.on("data", (data) => {
    user += data.toString();
  });

  req.on("end", async () => {
    try {
      const { name, username, email } = JSON.parse(user);
      const addedUser = await UserModel.addUser(name, username, email);

      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(addedUser));
    } catch (error) {
      res.writeHead(500, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Failed to add user",
          error: error.message || "Unknown error",
        })
      );
    }
  });
};

const upgradeOneUser = async (req, res) => {
  const parsedURL = url.parse(req.url, true);
  const userID = parsedURL.query.id;
  let user = "";

  req.on("data", (data) => {
    user += data.toString();
  });

  req.on("end", async () => {
    try {
      const { role } = JSON.parse(user);
      const upgradedUser = await UserModel.upgradeUser(userID, role);

      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(upgradedUser));
    } catch (error) {
      res.writeHead(500, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Failed to upgrade user",
          error: error.message || "Unknown error",
        })
      );
    }
  });
};

const submitCrimeOneUser = async (req, res) => {
  const parsedURL = url.parse(req.url, true);
  const userID = parsedURL.query.id;
  let reqBody = "";
  req.on("data", (data) => {
    reqBody = reqBody + data.toString();
  });

  req.on("end", async () => {
    try {
      const { crime } = JSON.parse(reqBody);
      const submitedCrimeUser = await UserModel.submitCrimeUser(userID, crime);

      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(submitedCrimeUser));
    } catch (error) {
      res.writeHead(500, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Failed to set crime user",
          error: error.message || "Unknown error",
        })
      );
    }
  });
};

const loginOneUser = async (req, res) => {
  let user = "";
  req.on("data", (data) => {
    user += data.toString();
  });

  req.on("end", async () => {
    try {
      const { username, email } = JSON.parse(user);
      const loginUser = await UserModel.loginUser(username, email);
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(loginUser));
    } catch (error) {
      res.writeHead(500, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Failed to set crime user",
          error: error.message || "Unknown error",
        })
      );
    }
  });
};

module.exports = {
  getAll,
  addOneUser,
  upgradeOneUser,
  submitCrimeOneUser,
  loginOneUser
};
