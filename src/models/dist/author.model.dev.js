"use strict";

var mongoose = require('mongoose');

var Book = require('../models/books.model');

var authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});
authorSchema.pre('remove', function (next) {
  // Sẽ tìm những books có id author mà bạn xóa
  Book.find({
    author: this.id
  }, function (err, books) {
    if (err) {
      next(err);
    } else if (books.length > 0) {
      books.forEach(function (book) {
        return book.remove();
      });
      next();
    } else {
      next();
    }
  });
});
module.exports = mongoose.model('Author', authorSchema);