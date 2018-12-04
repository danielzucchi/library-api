const server = require("../server");
const request = require("supertest");
const testHelper = require("./testHelper");

const creationTestBook = {
  isbn: "ISBN1234",
  title: "Title",
  author: "Author",
  edition: 1,
  numOfCopies: 1,
  about: "About",
  numOfPages: 500,
  illustrator: "Illustrator",
  copyrightYear: 1990,
  editor: "Editor",
  genre: "Genre",
  publisher: "Publisher",
  coverImage: "Cover Image",
  deleted: false
};

const searchTestBook = {
  isbn: "ISBN5678",
  title: "Other Title",
  author: "Other Author",
  edition: 1,
  numOfCopies: 1,
  deleted: false
};

const searchTestBookUpdated = {
  isbn: "ISBN5678",
  title: "New Updated Title",
  author: "New Updated Author",
  edition: 1,
  numOfCopies: 1,
  deleted: false
};

const bookToDelete = {
  isbn: "ISBN5678",
  title: "Other Title",
  author: "Other Author",
  edition: 1,
  numOfCopies: 1,
  deleted: false
};

describe("End to end tests", () => {
  let searchTestBookID;
  let listOfBooksToDelete = [];

  beforeAll(async () => {
    searchTestBookID = await testHelper.createBook(searchTestBook);
    listOfBooksToDelete.push(searchTestBookID);
  });

  afterAll(async () => {
    await testHelper.deleteBooksByIDs(listOfBooksToDelete);
  });

  it("Given the user creates a book, then the added book is returned with an Id.", async () => {
    return await request(server)
      .post("/library/books")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send(creationTestBook)
      .then(response => {
        listOfBooksToDelete.push(response.body._id);
        expect(response.statusCode).toBe(201);
        expect(response.body).toMatchObject(creationTestBook);
        expect(response.body._id).toBeDefined();
      });
  });

  it("Given the user enters an id to find a book, then the corresponding book is returned from the DB with status 200.", async () => {
    return await request(server)
      .get("/library/books/" + searchTestBookID)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject(searchTestBook);
        expect(response.body._id).toBeDefined();
      });
  });

  it("Given the user attempts to update a book, then the corresponding book is updated and the new version is returned from the DB with status 200.", async () => {
    return await request(server)
      .put("/library/books/" + searchTestBookID)
      .send(searchTestBookUpdated)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject(searchTestBookUpdated);
      });
  });

  it("Given the user attempts to delete a book, then the correstponding book is deleted and the successful delete message is returned.", async () => {
    const bookToDeleteId = await testHelper.createBook(bookToDelete);
    listOfBooksToDelete.push(bookToDeleteId);

    return await request(server)
      .delete("/library/books/" + bookToDeleteId)
      .set("Accept", "application/json")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
          message: "Other Title has been deleted."
        });
      });
  });
});
