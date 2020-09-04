const express = require("express")
const router = express.Router()
const Author = require('../models/author.model')
const Book = require('../models/books.model')


// GET Authors Page
router.get('/', async (req, res) => {
  let searchOptions = {}
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }
  try {
    const authors = await Author.find(searchOptions);
    res.render('authors/index', {
      authors: authors,
      searchOptions: req.query
    })

  } catch {
    res.redirect('/')
  }

});

// Get New Author
router.get('/new', (req, res) => {
  res.render('authors/new', {
    author: new Author()
  });
});

// Create New Author  
router.post('/', async (req, res) => {

  const author = new Author({
    name: req.body.name
  })

  // Kiểm tra name author có tồn tại hay không
  const nameAuthor = await Author.findOne({
    name: req.body.name
  });
  if (nameAuthor) {
    return res.render('authors/new', {
      author: author,
      errorMessage: 'Author already exists'
    })
  }

  try {
    await author.save();
    res.redirect('/authors')
  } catch {
    res.render('authors/new', {
      author: author,
      errorMessage: 'Error Creating Author'
    })
  }

});

// Show Details Author
router.get('/:id', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id)
    const booksByAuthor = await Book.find({
      author: author.id
    }).limit(6).exec()
    res.render('authors/show', {
      author: author,
      booksByAuthor: booksByAuthor
    })
  } catch {
    res.redirect('/')
  }
})


// Get Update Author
router.get('/:id/edit', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id)
    res.render('authors/edit', {
      author: author
    })
  } catch {
    res.redirect('/authors')
  }
})


// Update Author
router.put('/:id', async (req, res) => {
  
  let author
  author = await Author.findById(req.params.id)

  // Kiểm tra name author có tồn tại hay không
  const nameAuthor = await Author.findOne({
    name: req.body.name
  });
  if (nameAuthor) {
    return res.render('authors/edit', {
      author: author,
      errorMessage: 'Author already exists'
    })
  }

  try {
    author.name = req.body.name
    await author.save();
    res.redirect(`/authors/${author.id}`)

  } catch {
    if (author == null) {
      res.redirect('/')
    } else {
      res.render('authors/edit', {
        author: author,
        errorMessage: 'Error updating Author'
      })
    }
  }
})

// Delete Author
router.delete('/:id', async (req, res) => {
  let author
  try {
    author = await Author.findById(req.params.id)
    await author.remove()
    res.redirect('/authors')
  } catch {

    res.redirect(`/authors/${author.id}`)

  }
})

module.exports = router