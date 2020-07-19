if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
  }
const express = require("express")
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
const app = express()
const port = 4444

// view engine setup
app.set('view engine', 'pug');
app.set('views', 'views');

// Connect Database
 mongoose.connect(process.env.DATABASE_URL,{useUnifiedTopology: true,
   useNewUrlParser: true, })
 const db = mongoose.connection
  db.on('error', error => console.error(error))
  db.once('open', () => console.log('Connected to Database'))

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ limit:'10mb' ,extended: false }));  

const IndexRouter = require("../src/routes/index.routes")

app.use(IndexRouter)

app.listen(port, () => {
    console.log(`Server listening ${port}`)
})