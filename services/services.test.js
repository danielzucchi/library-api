const services = require("../services/services");
const Book = require("../models/book");
const mongoose = require("mongoose");
const MongoMemoryServer = require("mongodb-memory-server").default;

const mongoServer = new MongoMemoryServer();
const dbConnect = () => {
  mongoose.Promise = Promise;
  mongoServer.getConnectionString().then(mongoUri => {
    mongoose.connect(
      mongoUri,
      { useNewUrlParser: true, autoReconnect: false, bufferCommands: false }
    );
  });
};

describe("Calling service to find book by Id", () => {
  const book = {
    title: "David Copperfield",
    author: "Charles Dickens",
    copyrightYear: 1850,
    about: "",
    publisher: "Salani",
    available: true,
    genre: "Novel"
  };
  let bookModel = new Book(book);

  beforeEach(async () => {
    if (mongoose.connection.readyState === 0) {
      await dbConnect();
    }
    await bookModel.save();
  });

  afterAll(() => {
    mongoose.disconnect();
    mongoServer.stop();
  });

  it("Given service is called with Book Id, then service returns correct book with matching Id", async () => {
    const foundBook = await services.findBookById(bookModel.id);

    expect(foundBook).toMatchObject(book);
    expect(foundBook.id).toEqual(bookModel.id);
  });

  it("Given service is called with an innexistent Book Id, then service returns null", async () => {
    const foundBook = await services.findBookById("5be1c1c27adc17371cfe94f0");

    expect(foundBook).toBe(null);
  });

  it("Given service is called with null, then service returns null.", async () => {
    const foundBook = await services.findBookById(null);

    expect(foundBook).toBe(null);
  });

  it("Given service is called with undefined, then service returns null.", async () => {
    const foundBook = await services.findBookById(undefined);

    expect(foundBook).toBe(null);
  });

  it("Given service is called with an invalid Id, then service throws an exception", async () => {
    expect.assertions(1);

    try {
      await services.findBookById("random");
    } catch (err) {
      expect(err.message).toBe("The Book Id requested is invalid.");
    }
  });

  it("Given service is called while database connecrion is down, then service throws an exception", async () => {
    try {
      await mongoServer.stop();
      await services.findBookById("5be1c1c27adc17371cfe94f9");
    } catch (err) {
      expect(err.message).toBe("Failed to connect to the DB.");
    }
  });
});
