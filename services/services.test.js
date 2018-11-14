describe('bookService', () => {
    describe('save', () => {
        test('it calls Book.save with passed book', () => {
            const mockSave = jest.fn();

            jest.setMock('../models/book', {
                create: mockSave
            });
            const bookService = require('./services');
            const mockBook = {
                title: 'my title'
            };
            bookService.save(mockBook);
            expect(mockSave).toHaveBeenCalledWith(mockBook);
        });
    });
        test('it returns output of Book.save', () => {
            const mockBook = {
                title: 'my title'
            };
            jest.resetModules();
            
            jest.setMock('../models/book', {
                create: jest.fn().mockReturnValue(mockBook)
            });
            const bookService = require('./services');

            expect(bookService.save(mockBook)).toEqual(mockBook);
    });
    // test('it returns output of Book.save', () => {
    //     const mockBook = {
    //         title: 'my title'
    //     };

    //     jest.setMock('../models/book', {
    //         save: jest.fn(() => Promise.resolve(mockBook))
    //     });
    //     const bookService = require('./services');
    //     return bookService.save(mockBook)
    //         .then(function (actualBook) {
    //             expect(actualBook).toEqual(mockBook);
    //         });
    // });

    // bookService.save(book, (err, data) => {

    // })
    
    // bookService = {
    //     save: function (book, cb) {
    //         Book.save(book, cb);
    //     }
    // }
});
