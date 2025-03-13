const dataBase = require(`${process.cwd()}/data/db.json`);

const fs = require("fs");
const crypto = require("crypto");
const { resolve } = require("path");
const { rejects } = require("assert");

const find = () => {
  return new Promise((resolve, reject) => {
    resolve(db.users);
  });
};

const addUser = (name, username, email) => {
  return new Promise((resolve, reject) => {
    const isUserExist = dataBase.users.find(
      (user) => user.username == username || user.email == email
    );

    if (
      username.length == 0 ||
      name.length == 0 ||
      email.length == 0 ||
      username === "" ||
      name === "" ||
      email === ""
    ) {
      reject({ message: "Data user are not valid" });
    } else if (isUserExist) {
      reject({ message: "Email or Username already exist" });
    } else {
      const newUser = {
        id: crypto.randomUUID(),
        name,
        username,
        email,
        crime: 0,
        role: "USER",
      };

      dataBase.users.push(newUser);

      fs.writeFile(
        `${process.cwd()}/data/db.json`,
        JSON.stringify(dataBase),
        (err) => {
          if (err) {
            reject(err);
          }

          resolve({ message: "User registered successfully" });
        }
      );
    }
  });
};

const upgradeUser = (userID, role) => {
  return new Promise((resolve, reject) => {
    if (role.toUpperCase() == "ADMIN" || role.toUpperCase() == "USER") {
      dataBase.users.forEach((user) => {
        if (user.id == userID) {
          user.role = role.toUpperCase();
        }
      });

      fs.writeFile(
        `${process.cwd()}/data/db.json`,
        JSON.stringify(dataBase),
        (err) => {
          if (err) reject(err);

          resolve({
            message: "Role of user changed successfuly",
          });
        }
      );
    } else {
      reject({ message: "Role not valid" });
    }
  });
};

const submitCrimeUser = (userID, crime) => {
  return new Promise((resolve, rejects) => {
    dataBase.users.forEach((user) => {
      if (user.id == userID) {
        user.crime += crime;
      }
    });

    fs.writeFile(
      `${process.cwd()}/data/db.json`,
      JSON.stringify(dataBase),
      (err) => {
        if (err) rejects(err);

        resolve({ message: "Crime set successfully" });
      }
    );
  });
};

const loginUser = (username, email) => {
  return new Promise((resolve, reject) => {
    const mainUser = dataBase.users.find(
      (user) => user.username == username && user.email == email
    );

    if (mainUser) {
      resolve({
        username: mainUser.username,
        email: mainUser.email,
        name: mainUser.name,
      });
    } else {
      reject({ message: "User not found" });
    }
  });
};

module.exports = {
  find,
  addUser,
  upgradeUser,
  submitCrimeUser,
  loginUser,
};
