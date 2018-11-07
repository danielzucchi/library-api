const services = require("../services/services");
const Book = require("../models/book");
const mongoose = require("mongoose");
const MongoMemoryServer = require("mongodb-memory-server").default;

const mongoServer = new MongoMemoryServer();

mongoose.Promise = Promise;
mongoServer.getConnectionString().then(mongoUri => {
  mongoose.connect(
    mongoUri,
    { useNewUrlParser: true }
  );
});

describe("Service API request", () => {
  let book = new Book({
    title: "David Copperfield",
    author: "Charles Dickens",
    copyrightYear: 1850,
    about: "",
    publisher: "Salani",
    available: true,
    genre: "Novel"
  });

  beforeEach(async () => {
    await book.save();
  });

  afterAll(() => {
    mongoServer.stop();
  });

  it("Given the Book Id is called, then service returns correct book with matching Id", async () => {
    const foundBook = await services.findBookById(book.id);

    expect(foundBook.title).toEqual(book.title);
  });
});
