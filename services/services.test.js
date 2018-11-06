const services = require("../services/services");
const Book = require("../models/book");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost/books",
  { useNewUrlParser: true }
);

describe("Service API request", () => {
  it("Given the Book Id is called, then service returns correct book with matching Id", () => {
    let book = new Book({
      title: "David Copperfield",
      author: "Charles Dickens",
      copyrightYear: 1850,
      about: "",
      publisher: "Salani",
      available: true,
      genre: "Novel"
    });

    const createdBook = services.save(book);
    expect(createdBook.id).toMatch(book.id);
    expect(createdBook.title).toMatch("David Copperfield");

    afterEach(() => {
      service.delete(book.title);
    });
  });
});
