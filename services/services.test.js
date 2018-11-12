const services = require("../services/services");
const Book = require("../models/book");
const mongoose = require("mongoose");
const MongoMemoryServer = require("mongodb-memory-server").default;
const mongoServer = new MongoMemoryServer();

describe("Calling service to find book by Id", () => {
  const dbConnect = () => {
    mongoose.Promise = Promise;
    mongoServer.getConnectionString().then(mongoUri => {
      mongoose.connect(
        mongoUri,
        { useNewUrlParser: true, autoReconnect: false, bufferCommands: false }
      );
    });
  };

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

  // afterAll(() => {
  //   mongoServer.stop();
  // });

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

  it("Given service is called while database connection is down, then service throws an exception", async () => {
    try {
      await mongoServer.stop();
      await services.findBookById("5be1c1c27adc17371cfe94f9");
    } catch (err) {
      expect(err.message).toBe("Failed to connect to the DB.");
    } finally {
      await dbConnect();
      await mongoServer.start();
    }
  });
});

describe("Find book by name service", () => {
  mongoose.Promise = Promise;
  mongoServer.getConnectionString().then(mongoUri => {
    mongoose.connect(
      mongoUri,
      {
        useNewUrlParser: true,
        bufferMaxEntries: 0,
        bufferCommands: false,
        reconnectInterval: 100,
        reconnectTries: 1
      }
    );
  });

  let book1 = new Book({
    title: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
    copyrightYear: 2011,
    about: "Book about JavaScript",
    publisher: "No Starch Press Inc",
    available: true,
    genre: "Programming"
  });

  let book2 = new Book({
    title: "Blink",
    author: "Malcolm Gladwell",
    copyrightYear: 2005,
    about: "Smart thinking",
    publisher: "Penguin",
    available: true,
    genre: "Non-fiction"
  });

  beforeEach(async () => {
    if (mongoose.connection.readyState === 0) {
      const newdburi = await mongoServer.getConnectionString();
      await mongoose.connect(
        newdburi,
        {
          useNewUrlParser: true,
          autoReconnect: false,
          bufferCommands: false
        }
      );
    }
    await book1.save();
    return await book2.save();
  });

  // afterAll(async () => {
  //   return await mongoServer.stop();
  // });

  it("Given the findByName service is called, if there is one book that matches the passed in title, it should return an array with one book", async () => {
    const returnedBook = await services.findByName("Eloquent JavaScript");

    expect(returnedBook).toHaveLength(1);
  });

  it("Given the findByName service is called, if there are multiple books that match the passed in title, it should return an array with multiple book", async () => {
    let newBook = new Book({
      title: "Eloquent JavaScript",
      author: "Marijn Haverbeke",
      copyrightYear: 2011,
      about: "Book about JavaScript",
      publisher: "No Starch Press Inc",
      available: true,
      genre: "Programming"
    });

    await newBook.save();

    const returnedBook = await services.findByName("Eloquent JavaScript");

    expect(returnedBook).toHaveLength(2);
  });

  it("Given the findByName service is called, it should return an empty array if no title matches the passed in book name", async () => {
    const returnedBook = await services.findByName("lffnlkffk");

    expect(returnedBook).toHaveLength(0);
  });

  it("Given the findByName service is called, it should return an empty array if undefined is passed", async () => {
    const returnedBook = await services.findByName(undefined);

    expect(returnedBook).toHaveLength(0);
  });

  it("Given the findByName service is called, it should return an empty array if empty string is passed", async () => {
    const returnedBook = await services.findByName("");

    expect(returnedBook).toHaveLength(0);
  });

  it("Given the database connection fails, it should throw an error", async () => {
    expect.assertions(1);

    try {
      await mongoServer.stop();
      await services.findByName("test title");
    } catch (e) {
      expect(e.message).toMatch("Failed to connect to DB.");
    } finally {
      await mongoServer.start();
      const newdburi = await mongoServer.getConnectionString();
      await mongoose.connect(
        newdburi,
        {
          useNewUrlParser: true,
          autoReconnect: false,
          bufferCommands: false
        }
      );
    }
  });
});
