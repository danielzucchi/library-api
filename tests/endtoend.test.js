const server = require("../server");
const request = require("supertest");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

const book = {
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
  active: true
};

describe("End to end tests", () => {
  it("Given the user creates a book, then the book is added to the DB, and then the added book is returned with an Id.", async () => {
    return await request(server)
      .post("/library/books")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send(book)
      .then(response => {
        expect(response.statusCode).toBe(201);
        expect(response.body).toMatchObject(book);
        expect(response.body._id).toBeDefined();
      });
  });
});
