const service =require("./services");
const Book = require("../models/book");

describe("Service Methods", () => {
    let book = new Book({
        title: "David Copperfield",
        author: "Charles Dickens",
        copyrightYear: 1850,
        about: "",
        publisher: "Salani",
        available: true,
        genre: "Novel"
      });
    
      test("inserts a book", () => {
        const result = service.save(book);
        expect(result.title).toBe("David Copperfield");
        expect(result.author).toBe("Charles Dickens");
        expect(result.copyrightYear).toBe(1850);
       });

    afterEach(function() {
       service.delete(book.title);
    });
});   

  