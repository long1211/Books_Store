"use strict";

var express = require("express");

var router = express.Router();

var Author = require("../models/author.model");

var Book = require("../models/books.model");

var cloudinary = require('cloudinary');

var upload = require('../handlers/upload.multer'); // Setup Cloudinary


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_ID,
  api_secret: process.env.API_SECRET
}); // GET Books Page

router.get('/', function _callee(req, res, next) {
  var query, books;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          query = Book.find();

          if (req.query.title != null && req.query.title != '') {
            query = query.regex('title', new RegExp(req.query.title, 'i'));
          }

          if (req.query.publishedAfter != null && req.query.publishedAfter != '') {
            query = query.gte('publishDate', req.query.publishedAfter);
          }

          if (req.query.publishedBefore != null && req.query.publishedBefore != '') {
            query = query.lte('publishDate', req.query.publishedBefore);
          }

          _context.prev = 4;
          _context.next = 7;
          return regeneratorRuntime.awrap(query.exec());

        case 7:
          books = _context.sent;
          res.render('books/index', {
            books: books,
            searchOptions: req.query
          });
          _context.next = 14;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](4);
          res.redirect('/');

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 11]]);
}); // Get New Books

router.get('/new', function _callee2(req, res, next) {
  var authors, book;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Author.find());

        case 3:
          authors = _context2.sent;
          book = new Book();
          res.render('books/new', {
            authors: authors,
            book: book
          });
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          res.redirect('/books');

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); // Create New Books

router.post('/', upload.single('ImageUrl'), function _callee3(req, res, next) {
  var result, authors, book, newBook;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(cloudinary.v2.uploader.upload(req.file.path));

        case 2:
          result = _context3.sent;
          _context3.next = 5;
          return regeneratorRuntime.awrap(Author.find());

        case 5:
          authors = _context3.sent;
          book = new Book({
            title: req.body.title,
            author: req.body.author,
            publishDate: new Date(req.body.publishDate),
            pageCount: req.body.pageCount,
            description: req.body.description,
            ImageUrl: result.secure_url
          });
          _context3.prev = 7;
          _context3.next = 10;
          return regeneratorRuntime.awrap(book.save());

        case 10:
          newBook = _context3.sent;
          // res.redirect('/books')
          res.redirect("books/".concat(newBook.id));
          _context3.next = 17;
          break;

        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](7);
          res.render('books/new', {
            authors: authors,
            book: book,
            errorMessage: 'Error Creating Book'
          });

        case 17:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[7, 14]]);
}); // Show Details Books

router.get('/:id', function _callee4(req, res, next) {
  var book;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Book.findById(req.params.id).populate('author').exec());

        case 3:
          book = _context4.sent;
          res.render('books/show', {
            book: book
          });
          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          res.redirect('/');

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // Get Update Books

router.get('/:id/edit', function _callee5(req, res, next) {
  var book, authors;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Book.findById(req.params.id));

        case 3:
          book = _context5.sent;
          _context5.next = 6;
          return regeneratorRuntime.awrap(Author.find());

        case 6:
          authors = _context5.sent;
          res.render('books/edit', {
            authors: authors,
            book: book
          });
          _context5.next = 13;
          break;

        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](0);
          res.redirect('/books');

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 10]]);
}); // Update Books

router.put('/:id', upload.single('ImageUrl'), function _callee6(req, res, next) {
  var result, authors, book;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(cloudinary.v2.uploader.upload(req.file.path));

        case 2:
          result = _context6.sent;
          _context6.next = 5;
          return regeneratorRuntime.awrap(Author.find());

        case 5:
          authors = _context6.sent;
          _context6.prev = 6;
          _context6.next = 9;
          return regeneratorRuntime.awrap(Book.findById(req.params.id));

        case 9:
          book = _context6.sent;
          book.title = req.body.title, book.author = req.body.author, book.publishDate = new Date(req.body.publishDate), book.pageCount = req.body.pageCount, book.description = req.body.description, book.ImageUrl = result.secure_url;
          _context6.next = 13;
          return regeneratorRuntime.awrap(book.save());

        case 13:
          res.redirect('/books');
          _context6.next = 19;
          break;

        case 16:
          _context6.prev = 16;
          _context6.t0 = _context6["catch"](6);
          res.render('books/edit', {
            authors: authors,
            book: book,
            errorMessage: 'Error Updating Book'
          });

        case 19:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[6, 16]]);
}); // Delete Books

router["delete"]('/:id', function _callee7(req, res, next) {
  var book;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(Book.findById(req.params.id));

        case 3:
          book = _context7.sent;
          _context7.next = 6;
          return regeneratorRuntime.awrap(book.remove());

        case 6:
          res.redirect('/books');
          _context7.next = 12;
          break;

        case 9:
          _context7.prev = 9;
          _context7.t0 = _context7["catch"](0);
          res.redirect("/books/".concat(book.id));

        case 12:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
module.exports = router;