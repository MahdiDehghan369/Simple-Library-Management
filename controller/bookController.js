const url = require("url");
const crypto = require("crypto");

const BookModel = require("../model/book");

const getAll = async (req, res) => {
  const books = await BookModel.find();
  res.writeHead(200, { "content-type": "application/json" });
  res.end(JSON.stringify(books));
};

const removeOne = async (req, res) => {
  const parseUrl = url.parse(req.url, true);
  const bookID = parseUrl.query.id;

  try {
    const removedBook = await BookModel.removeBook(bookID);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(removedBook));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Failed to remove the book",
        error: error.message || "Unknown error",
      })
    );
  }
};

const addOneBook = async (req, res) => {
  let book = "";
  let newBook = "";
  req.on("data", (data) => {
    book += data.toString();
  });

  req.on("end", async () => {
    try {
      newBook = {
        id: crypto.randomUUID(),
        ...JSON.parse(book),
        free: 1,
      };
      const addedBook = await BookModel.addBook(newBook);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(addedBook));
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Failed to add the book",
          error: error.message || "Unknown error",
        })
      );
    }
  });
};

const backOneBook = async (req, res) => {
  try {
    const parsedURL = url.parse(req.url, true);
    const bookID = parsedURL.query.id;
    const backedBook = await BookModel.backBook(bookID);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.write(JSON.stringify(backedBook));
    res.end();
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Failed to back the book",
        error: error.message || "Unknown error",
      })
    );
  }
};

const updateOneBook = async (req, res) => {
  try {
    const parsedURL = url.parse(req.url, true);
    const bookID = parsedURL.query.id;
    const updatedBook = await BookModel.updateBook(bookID, req);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.write(JSON.stringify(updatedBook));
    res.end();
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Failed to update the book",
        error: error.message || "Unknown error",
      })
    );
  }
};




module.exports = {
  getAll,
  removeOne,
  addOneBook,
  backOneBook,
  updateOneBook,
};
