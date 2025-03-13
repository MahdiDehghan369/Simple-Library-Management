const fs = require("fs");
const crypto = require("crypto");
const dataBase = require(`${process.cwd()}/data/db.json`);

const find = () => {
  return new Promise((resolve, reject) => {
    resolve(dataBase.books);
  });
};

const removeBook = (bookID) => {
  return new Promise((resolve, reject) => {
    const newBooks = dataBase.books.filter((book) => book.id != bookID);

    if (newBooks.length == dataBase.books.length) {
      reject({ message: "book not found" });
    } else {
      fs.writeFile(
        `${process.cwd()}/data/db.json`,
        JSON.stringify({ ...dataBase, books: newBooks }),
        (err) => {
          if (err) {
            reject(err);
          }

          resolve({ message: "book removed successfully" });
        }
      );
    }
  });
};

const addBook = (newBook) => {
  return new Promise((resolve, reject) => {
    dataBase.books.push(newBook);
    fs.writeFile(
      `${process.cwd()}/data/db.json`,
      JSON.stringify(dataBase),
      (err) => {
        if (err) {
          reject(err);
        }

        resolve({ message: "Book added successfully!" });
      }
    );
  });
};

const backBook = (bookID) => {
  return new Promise((resolve, reject) => {
    dataBase.books.forEach((book) => {
      if (book.id === bookID) {
        book.free = 1;
      }
    });

    fs.writeFile(
      `${process.cwd()}/data/db.json`,
      JSON.stringify(dataBase),
      (err) => {
        if (err) reject(err);

        resolve({ message: "The book was successfully delivered" });
      }
    );
  });
};

const updateBook = (bookID, req) => {
  return new Promise((resolve, reject) => {
    let book = "";
    req.on("data", (data) => {
      book += data.toString();
    });

    req.on("end", () => {
      const reqBody = JSON.parse(book);

      dataBase.books.forEach((book) => {
        if (book.id === bookID) {
          book.title = reqBody.title;
          book.author = reqBody.author;
          book.price = reqBody.price;
        }
      });

      fs.writeFile(
        `${process.cwd()}/data/db.json`,
        JSON.stringify(dataBase),
        (err) => {
          if (err) {
            reject(err);
          }

          resolve({ message: "Book updated successfully" });
        }
      );
    });
  });
};




module.exports = {
  find,
  removeBook,
  addBook,
  backBook,
  updateBook,
};
