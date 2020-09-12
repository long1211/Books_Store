require('dotenv').config()
const express = require("express")
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express()
// const port = 4444

// Import routes
const IndexRouter = require("../src/routes/index.routes")
const BookRouter = require("../src/routes/books.routes")
const AuthorRouter = require("../src/routes/author.routes")
// view engine setup
app.set('view engine', 'pug');
app.set('views', 'src/views');

// Static file
app.use(express.static('src/public'))

// Method Override
app.use(methodOverride('_method'));

// Connect Database
mongoose.connect(process.env.DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Database'))

// Body Parse
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  limit: '10mb',
  extended: false
}));


app.use('/', IndexRouter)
app.use('/books', BookRouter)
app.use('/authors', AuthorRouter)

// app.listen(port, () => {
//   console.log(`Server listening ${port}`)
// })

app.listen(process.env.PORT || 4444)