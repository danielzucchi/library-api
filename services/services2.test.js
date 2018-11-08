const mongoose = require("mongoose");
const MongoMemoryServer = require("mongodb-memory-server").default;
const service = require("../services/services");
const { MongoClient } = require("mongodb");

// May require additional time for downloading MongoDB binaries
jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

let mongoServer;
let connection;
let dbName;
let db;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getConnectionString();
  connection = await MongoClient.connect(mongoUri);
  dbName = await mongoServer.getDbName();
  console.log(dbName);
  db = await connection.db(dbName);

  await db.createCollection("Books");
});

afterAll(async () => {
  // await connection.close();
  // await db.close();
});

// beforeAll(async () => {
//   mongoServer = new MongoMemoryServer();
//   const mongoUri = await mongoServer.getConnectionString();
//   db = await mongoose.connect(
//     mongoUri,
//     err => {
//       if (err) console.error(err);
//     }
//   );
//   console.log(db, db);
// });

// afterAll(() => {
//   mongoose.disconnect();
//   mongoServer.stop();
// });

let book1 = {
  title: "Eloquent JavaScript",
  author: "Marijn Haverbeke",
  copyrightYear: 2011,
  about: "Book about JavaScript",
  publisher: "No Starch Press Inc",
  available: true,
  genre: "Programming"
};

let book2 = {
  title: "Blink",
  author: "Malcolm Gladwell",
  copyrightYear: 2005,
  about: "Smart thinking",
  publisher: "Penguin",
  available: true,
  genre: "Non-fiction"
};

beforeEach(async () => {
  await db.Books.save(book1);
  return await db.Books.save(book2);
});

afterEach(async () => {
  await db.Books.findOneAndDelete({ title: "Eloquent JavaScript" });
  await db.Books.findOneAndDelete({ title: "Blink" });
});

describe("Services", () => {
  it("Given the findByName service is called, it should return a book with a title that matches the passed in book name", async () => {
    const returnedBook = await service.findByName("Eloquent JavaScript");

    expect(returnedBook[0].author).toEqual("Marijn Haverbeke");
    expect(returnedBook[0].copyrightYear).toEqual(2011);
  });

  // it("Given the findByName service is called, it should return an error if no title matches the passed in book name", async () => {
  //   const returnedBook = await service.findByName("lffnlkffk");

  //   expect(returnedBook).toHaveLength(0);
  // });

  // it("Given the findByName service is called, it should return an error if no title matches the passed in book name", async () => {
  //   const returnedBook = await service.findByName("lffnlkffk");

  //   expect(returnedBook).toHaveLength(0);
  // });
});
