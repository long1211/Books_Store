const express = require("express")
const router = express.Router()
const Book = require("../models/books.model")

// Home page
router.get('/', async (req, res, next) => {
  let books
  try {
    // find books được sắp xếp theo thứ tự books nào tạo trước books nào tạo sau và chỉ giới hạn hiển thị 20 books thôi nha
    books = await Book.find().sort({createdAt: 'desc'}).limit(20).exec() 
  } catch {
    books = []
  }
  res.render('index', {
    books: books 
  });
})

module.exports = router