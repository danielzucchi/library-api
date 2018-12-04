const Book = require("./book");

describe("Book Model", () => {
  describe("ISBN property", () => {
    it("has the property isbn", () => {
      expect(Book.schema.paths.isbn).toBeDefined;
    });

    it("has isbn as a string", () => {
      const isbn_type = typeof Book.schema.paths.isbn.options.type();
      expect(isbn_type).toBe("string");
    });

    it("isbn is required", () => {
      expect(Book.schema.paths.isbn.options.required).toBeTruthy();
    });
  });

  describe("Title property", () => {
    it("has the property title", () => {
      expect(Book.schema.paths.title).toBeDefined;
    });

    it("has title as a string", () => {
      const title_type = typeof Book.schema.paths.title.options.type();
      expect(title_type).toBe("string");
    });

    it("title is required", () => {
      expect(Book.schema.paths.title.options.required).toBeTruthy();
    });
  });

  describe("author property", () => {
    it("has the property author", () => {
      expect(Book.schema.paths.author).toBeDefined;
    });

    it("has author as a string", () => {
      const author_type = typeof Book.schema.paths.author.options.type();
      expect(author_type).toBe("string");
    });

    it("author is required", () => {
      expect(Book.schema.paths.author.options.required).toBeTruthy();
    });
  });

  describe("edition property", () => {
    it("has the property edition", () => {
      expect(Book.schema.paths.edition).toBeDefined;
    });

    it("has edition as a number", () => {
      const edition_type = typeof Book.schema.paths.edition.options.type();
      expect(edition_type).toBe("number");
    });

    it("edition is required", () => {
      expect(Book.schema.paths.edition.options.required).toBeTruthy();
    });
  });

  describe("numOfCopies property", () => {
    it("has the property numOfCopies", () => {
      expect(Book.schema.paths.numOfCopies).toBeDefined;
    });

    it("has numOfCopies as a number", () => {
      const numOfCopies_type = typeof Book.schema.paths.numOfCopies.options.type();
      expect(numOfCopies_type).toBe("number");
    });

    it("numOfCopies is required", () => {
      expect(Book.schema.paths.numOfCopies.options.required).toBeTruthy();
    });
  });

  describe("about property", () => {
    it("has the property about", () => {
      expect(Book.schema.paths.about).toBeDefined;
    });

    it("has about as a string", () => {
      const about_type = typeof Book.schema.paths.about.options.type();
      expect(about_type).toBe("string");
    });
  });

  describe("numOfCopies property", () => {
    it("has the property numOfCopies", () => {
      expect(Book.schema.paths.numOfCopies).toBeDefined;
    });

    it("has numOfCopies as a number", () => {
      const numOfCopies_type = typeof Book.schema.paths.numOfCopies.options.type();
      expect(numOfCopies_type).toBe("number");
    });
  });

  describe("illustrator property", () => {
    it("has the property illustrator", () => {
      expect(Book.schema.paths.illustrator).toBeDefined;
    });

    it("has illustrator as a string", () => {
      const illustrator_type = typeof Book.schema.paths.illustrator.options.type();
      expect(illustrator_type).toBe("string");
    });
  });

  describe("copyrightYear property", () => {
    it("has the property copyrightYear", () => {
      expect(Book.schema.paths.copyrightYear).toBeDefined;
    });

    it("has copyrightYear as a number", () => {
      const copyrightYear_type = typeof Book.schema.paths.copyrightYear.options.type();
      expect(copyrightYear_type).toBe("number");
    });
  });

  describe("editor property", () => {
    it("has the property editor", () => {
      expect(Book.schema.paths.editor).toBeDefined;
    });

    it("has editor as a string", () => {
      const editor_type = typeof Book.schema.paths.editor.options.type();
      expect(editor_type).toBe("string");
    });
  });

  describe("genre property", () => {
    it("has the property genre", () => {
      expect(Book.schema.paths.genre).toBeDefined;
    });

    it("has genre as a string", () => {
      const genre_type = typeof Book.schema.paths.genre.options.type();
      expect(genre_type).toBe("string");
    });
  });

  describe("publisher property", () => {
    it("has the property genre", () => {
      expect(Book.schema.paths.publisher).toBeDefined;
    });

    it("has publisher as a string", () => {
      const publisher_type = typeof Book.schema.paths.publisher.options.type();
      expect(publisher_type).toBe("string");
    });
  });

  describe("coverImage property", () => {
    it("has the property coverImage", () => {
      expect(Book.schema.paths.coverImage).toBeDefined;
    });

    it("has coverImage as a string", () => {
      const coverImage_type = typeof Book.schema.paths.coverImage.options.type();
      expect(coverImage_type).toBe("string");
    });
  });

  describe("deleted property", () => {
    it("has the property deleted", () => {
      expect(Book.schema.paths.deleted).toBeDefined;
    });

    it("has deleted as a boolean", () => {
      const deleted_type = typeof Book.schema.paths.deleted.options.type();
      expect(deleted_type).toBe("boolean");
    });
    it("deleted is required", () => {
      expect(Book.schema.paths.deleted.options.default).toBeFalsy();
    });
  });
});
