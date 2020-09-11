"use strict";

var express = require("express");

var router = express.Router();

var Author = require('../models/author.model');

var Book = require('../models/books.model'); // GET Authors Page


router.get('/', function _callee(req, res) {
  var searchOptions, authors;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          searchOptions = {};

          if (req.query.name != null && req.query.name !== '') {
            searchOptions.name = new RegExp(req.query.name, 'i');
          }

          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(Author.find(searchOptions));

        case 5:
          authors = _context.sent;
          res.render('authors/index', {
            authors: authors,
            searchOptions: req.query
          });
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](2);
          res.redirect('/');

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 9]]);
}); // Get New Author

router.get('/new', function (req, res) {
  res.render('authors/new', {
    author: new Author()
  });
}); // Create New Author  

router.post('/', function _callee2(req, res) {
  var author, nameAuthor;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          author = new Author({
            name: req.body.name
          }); // Kiểm tra name author có tồn tại hay không

          _context2.next = 3;
          return regeneratorRuntime.awrap(Author.findOne({
            name: req.body.name
          }));

        case 3:
          nameAuthor = _context2.sent;

          if (!nameAuthor) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.render('authors/new', {
            author: author,
            errorMessage: 'Author Already Exists'
          }));

        case 6:
          _context2.prev = 6;
          _context2.next = 9;
          return regeneratorRuntime.awrap(author.save());

        case 9:
          res.redirect('/authors');
          _context2.next = 15;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](6);
          res.render('authors/new', {
            author: author,
            errorMessage: 'Error Creating Author'
          });

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[6, 12]]);
}); // Show Details Author

router.get('/:id', function _callee3(req, res) {
  var author, booksByAuthor;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Author.findById(req.params.id));

        case 3:
          author = _context3.sent;
          _context3.next = 6;
          return regeneratorRuntime.awrap(Book.find({
            author: author.id
          }).limit(6).exec());

        case 6:
          booksByAuthor = _context3.sent;
          res.render('authors/show', {
            author: author,
            booksByAuthor: booksByAuthor
          });
          _context3.next = 13;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          res.redirect('/');

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 10]]);
}); // Get Update Author

router.get('/:id/edit', function _callee4(req, res) {
  var author;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Author.findById(req.params.id));

        case 3:
          author = _context4.sent;
          res.render('authors/edit', {
            author: author
          });
          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          res.redirect('/authors');

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // Update Author

router.put('/:id', function _callee5(req, res) {
  var author, nameAuthor;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Author.findById(req.params.id));

        case 2:
          author = _context5.sent;
          _context5.next = 5;
          return regeneratorRuntime.awrap(Author.findOne({
            name: req.body.name
          }));

        case 5:
          nameAuthor = _context5.sent;

          if (!nameAuthor) {
            _context5.next = 8;
            break;
          }

          return _context5.abrupt("return", res.render('authors/edit', {
            author: author,
            errorMessage: 'Author Already Exists'
          }));

        case 8:
          _context5.prev = 8;
          author.name = req.body.name;
          _context5.next = 12;
          return regeneratorRuntime.awrap(author.save());

        case 12:
          res.redirect("/authors/".concat(author.id));
          _context5.next = 18;
          break;

        case 15:
          _context5.prev = 15;
          _context5.t0 = _context5["catch"](8);

          if (author == null) {
            res.redirect('/');
          } else {
            res.render('authors/edit', {
              author: author,
              errorMessage: 'Error Updating Author'
            });
          }

        case 18:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[8, 15]]);
}); // Delete Author

router["delete"]('/:id', function _callee6(req, res) {
  var author;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Author.findById(req.params.id));

        case 3:
          author = _context6.sent;
          _context6.next = 6;
          return regeneratorRuntime.awrap(author.remove());

        case 6:
          res.redirect('/authors');
          _context6.next = 12;
          break;

        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](0);
          res.redirect("/authors/".concat(author.id));

        case 12:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
module.exports = router;