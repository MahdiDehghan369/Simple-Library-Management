const RentModel = require(`${process.cwd()}/model/rent`);

const rentOneBook = async (req, res) => {
  let reqBody = "";
  req.on("data", (data) => {
    reqBody += data.toString();
  });

  req.on("end", async () => {
    try {
      const { bookID, userID } = JSON.parse(reqBody);
      const rentBook = await RentModel.rentBook(bookID, userID);
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(rentBook));
    } catch (error) {
      res.writeHead(500, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Failed to rent book",
          error: error.message || "Unknown error",
        })
      );
    }
  });
};

module.exports = {
  rentOneBook,
};
