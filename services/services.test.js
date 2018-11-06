const service =require("./services");
const Book = require("../models/book");

describe("Service Methods", () => {
    let book = new Book({
        title: "Tiziade",
        author: "Tizio Caio",
        copyrightYear: 1853,
        about: "",
        publisher: "Salani",
        available: true,
        genre: "Novel"
      });
    
      test("inserts a book", () => {
        // const result = service.save(book);
        // expect(result.title).toBe("Tiziade");
        // expect(result.author).toBe("Tizio Caio");
       });

    afterEach(function() {
       //service.delete(book.title);
    });
});   

  