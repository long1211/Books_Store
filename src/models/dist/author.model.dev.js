"use strict";

var mongoose = require('mongoose');

var Book = require('../models/books.model');

var authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
}); // Nếu xóa author thì sẽ xóa toàn bộ books của author đó

authorSchema.pre('remove', function (next) {
  Book.find({
    // Sẽ tìm những books có id author mà bạn xóa
    author: this.id
  }, function (err, books) {
    if (err) {
      next(err);
    } else if (books.length > 0) {
      next(new Error('This author has books still'));
    } else {
      next();
    }
  });
});
module.exports = mongoose.model('Author', authorSchema);