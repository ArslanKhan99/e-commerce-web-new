 const express = require('express')

 const app = express()

 const PORT = process.env.PORT || 3000

 app.listen(PORT ,()=> {
     console.log("listening on PORT " + PORT)
 })

 const expressLayout = require('express-ejs-layouts')

     app.use(expressLayout)


