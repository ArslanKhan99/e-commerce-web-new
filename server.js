const express = require('express')

const app=express()

const ejs= require ('ejs')
const expressLayout = require( 'express-ejs-layouts')

const PORT= process.env.PORT || 3000

app.use(express.static('public'))
app.use('/css',express.static(__dirname+'public/css'))
app.use('/img',express.static(__dirname+'public/img'))
app.use(express.static('resources'))
app.use('/js',express.static(__dirname+'resources/js'))


const path= require ('path')

app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))

app.set('view engine' , 'ejs')


require('./routes/web')(app)


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}` )
})