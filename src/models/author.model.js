const mongoose = require('mongoose');
const Book = require('../models/books.model')

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

authorSchema.pre('remove', function(next) {
    // Sẽ tìm những books có id author mà bạn xóa
    Book.find({author: this.id}, (err, books) => {
        if (err) {
            next (err)
        } else if (books.length > 0) {
            books.forEach(book => book.remove())
            next()
        } else {
            next()
        }
    })
})

module.exports = mongoose.model('Author', authorSchema)