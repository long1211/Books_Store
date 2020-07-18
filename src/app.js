const express = require("express")
const app = express()

const port = 4444

app.get('/', (req, res, next) => {
      res.send(" Hello World")
})

app.listen(port, () =>{
    console.log(`Server listening ${port}`)
})