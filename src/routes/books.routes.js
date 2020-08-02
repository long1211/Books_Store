const express = require("express")
const router = express.Router()
const Author = require("../models/author.model")
const Book = require("../models/books.model")
const cloudinary = require('cloudinary')
const upload = require('../handlers/upload.multer')

// Setup Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_ID,
    api_secret: process.env.API_SECRET
})


// GET home page. 
router.get('/', async (req, res, next) => {
    let query = Book.find()

    if (req.query.title != null && req.query.title != '') {
        query = query.regex('title', new RegExp(req.query.title, 'i'))
    }
    if (req.query.publishedAfter != null && req.query.publishedAfter != '') {
        query = query.gte('publishDate', req.query.publishedAfter)
    }
    if (req.query.publishedBefore != null && req.query.publishedBefore != '') {
        query = query.lte('publishDate', req.query.publishedBefore)
    }

    try {
        const books = await query.exec()
        res.render('books/index', {
            books: books,
            searchOptions: req.query
        })
    } catch{
        res.redirect('/')
    }
});

// Get New Book
router.get('/new', async (req, res, next) => {
    try {
        const authors = await Author.find()
        const book = new Book()

        const params = {
            authors: authors,
            book: book
        }

        res.render('books/new', params)
    } catch{
        res.redirect('/books')
    }

});

//  Post New Book
router.post('/', upload.single('ImageUrl'), async (req, res) => {
    const result = await cloudinary.v2.uploader.upload(req.file.path)

    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishDate: new Date(req.body.publishDate),
        pageCount: req.body.pageCount,
        description: req.body.description,
        ImageUrl: result.secure_url
    })
    try {
        const newBook = await book.save()
        res.redirect(`books/${newBook.id}`)
    } catch{
        res.render('books/new', {
            errorMessage: 'Error creating Author'
        })
    }
});

// Show Books
router.get('/:id', async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id).populate('author').exec();
        res.render('books/show',
            {
                book: book,

            })
    } catch{
        res.redirect('/')
    }
})
// Edit
router.get('/:id/edit', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        const authors = await Author.find()

        const params = {
            authors: authors,
            book: book
        }

        res.render('books/edit', params)
    } catch {
        res.redirect('/')
    }
})
// Update
router.put('/:id', upload.single('ImageUrl'), async (req, res, next) => {
    const result = await cloudinary.v2.uploader.upload(req.file.path)
    let book
    try {
        book = await Book.findById(req.params.id)
            book.title = req.body.title,
            book.author = req.body.author,
            book.publishDate = new Date(req.body.publishDate),
            book.pageCount = req.body.pageCount,
            book.description = req.body.description,
            book.ImageUrl = result.secure_url
        await book.save()

        res.redirect('/books')
    } catch{     
            res.redirect('/')
    }
})

// Delete
router.delete('/:id', async (req, res, next) => {
    let book
    try {
        book = await Book.findById(req.params.id)
        await book.remove()
        res.redirect('/books')
    } catch{
        res.redirect('/')
    }
})
module.exports = router