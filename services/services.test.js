const service = require("../services/services");
const Book = require("../models/book");
const mongoose = require("mongoose");
const MongoMemoryServer = require("mongodb-memory-server").default;

const mongoServer = new MongoMemoryServer();

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

  mongoose.connection.on("error", e => {
    if (e.message.code === "ETIMEDOUT") {
      console.log(e);
      mongoose.connect(mongoUri);
    }
    console.log(e);
  });

  mongoose.connection.once("open", () => {
    console.log(`MongoDB successfully connected to ${mongoUri}`);
  });
});

describe("", () => {
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

  afterAll(async () => {
    return await mongoServer.stop();
  });

  it("Given the findByName service is called, if there is one book that matches the passed in title, it should return an array with one book", async () => {
    const returnedBook = await service.findByName("Eloquent JavaScript");

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

    const returnedBook = await service.findByName("Eloquent JavaScript");

    expect(returnedBook).toHaveLength(2);
  });

  it("Given the findByName service is called, it should return an empty array if no title matches the passed in book name", async () => {
    const returnedBook = await service.findByName("lffnlkffk");

    expect(returnedBook).toHaveLength(0);
  });

  it("bad test", async () => {
    expect.assertions(1);

    try {
      await mongoServer.stop();
      await service.findByName("test title");
    } catch (e) {
      expect(e.message).toMatch("Failed to connect to DB.");
    } finally {
      await mongoServer.start();
      const newdburi = await mongoServer.getConnectionString();
      await mongoose.disconnect();
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

  it("Given the findByName service is called, it should return an empty array if undefined is passed", async () => {
    const returnedBook = await service.findByName(undefined);

    expect(returnedBook).toHaveLength(0);
  });

  it("Given the findByName service is called, it should return an empty array if empty string is passed", async () => {
    const returnedBook = await service.findByName("");

    expect(returnedBook).toHaveLength(0);
  });

  // it("test exception", done => {
  //   mongoServer.stop().then(() => {
  //     console.log("mongoose disconnected");
  //     setTimeout(() => {
  //       service
  //         .findByName("aadad")
  //         .then(() => {
  //           console.log("found book");
  //           done();
  //         })
  //         .catch(e => {
  //           console.log("threw exception: " + e);
  //           expect(e.message).toBe("Failed to connect to DB.");
  //           done();
  //         })
  //         .finally(() => {
  //           console.log("finally");
  //           mongoServer.start();
  //           done();
  //         });
  //     }, 3000);
  //   });
  // });
});
