const express = require('express')
const app=express()
const ejs= require ('ejs')
const expressLayout = require( 'express-ejs-layouts')
const PORT= process.env.PORT || 3000
const path= require ('path')
const firebase= require('firebase-admin')
const serviceAccount = require("./serviceAccountKey.json")


firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://shoopi-c4b3f-default-rtdb.firebaseio.com/"
});

const db=firebase.database();

app.use(express.static('public'))
app.use('/css',express.static(__dirname+'public/css'))
app.use('/img',express.static(__dirname+'public/img'))
app.use(express.static('resources'))
app.use('/js',express.static(__dirname+'resources/js'))

app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))

app.set('view engine' , 'ejs')


require('./routes/web')(app,db)


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}` )
})