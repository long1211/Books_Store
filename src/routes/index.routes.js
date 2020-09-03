const express = require("express")
const router = express.Router()
const Book = require("../models/books.model")

// Home page
router.get('/', async (req, res, next) => {
  let books
  try {
    books = await Book.find().sort({
      createdAt: 'desc'
    }).limit(10).exec()
  } catch {
    books = []
  }
  res.render('index', {
    books: books
  });
})

module.exports = router