const fs = require("fs");
const crypto = require("crypto");

const dataBase = require(`${process.cwd()}/data/db.json`);
const { resolve } = require("path");
const { rejects } = require("assert");

const rentBook = (bookID, userID) => {
  return new Promise((resolve, rejects) => {
    const isFree = dataBase.books.some(
      (book) => book.id == bookID && book.free == 1
    );

    if (isFree) {
      dataBase.books.forEach((book) => {
        if (book.id == bookID) {
          book.free = 0;
        }
      });

      const newRent = {
        id: crypto.randomUUID(),
        userID,
        bookID,
      };

      dataBase.rents.push(newRent);

      fs.writeFile(
        `${process.cwd()}/data/db.json`,
        JSON.stringify(dataBase),
        (err) => {
          if (err) rejects(err);

          resolve({ message: "Book reserved successfully" });
        }
      );
    } else {
      rejects({ message: "Book is not free" });
    }
  });
};

module.exports = {
  rentBook,
};
