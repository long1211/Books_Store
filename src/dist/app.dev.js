"use strict";

require('dotenv').config();

var express = require("express");

var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var methodOverride = require('method-override');

var app = express();
var port = 4444; // Import routes

var IndexRouter = require("../src/routes/index.routes");

var BookRouter = require("../src/routes/books.routes");

var AuthorRouter = require("../src/routes/author.routes"); // view engine setup


app.set('view engine', 'pug');
app.set('views', 'src/views'); // Static file

app.use(express["static"]('src/public')); // Method Override

app.use(methodOverride('_method')); // Connect Database

mongoose.connect(process.env.DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
var db = mongoose.connection;
db.on('error', function (error) {
  return console.error(error);
});
db.once('open', function () {
  return console.log('Connected to Database');
}); // Body Parse

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  limit: '10mb',
  extended: false
}));
app.use('/', IndexRouter);
app.use('/books', BookRouter);
app.use('/authors', AuthorRouter);
app.listen(port, function () {
  console.log("Server listening ".concat(port));
});