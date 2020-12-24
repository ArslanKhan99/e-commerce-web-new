require('dotenv').config()
const express = require('express')
const app=express()
const ejs= require ('ejs')
const expressLayout = require( 'express-ejs-layouts')
const PORT= process.env.PORT || 3000
const path= require ('path')
const firebase= require('firebase-admin')
const firebaseClient= require('firebase')
const serviceAccount = require("./serviceAccountKey.json")
const session = require('express-session')
const FirebaseStore= require('connect-session-firebase')(session)
const flash = require('express-flash')
const Razorpay = require('razorpay')
const fileUpload = require('express-fileupload')
let multer = require("multer");

let storage =   multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    }, filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});
let upload = multer({ storage : storage}).single('firstImage');


let instance = new Razorpay({
    key_id: 'rzp_test_gohI6abFxkodvC',
    key_secret: 'bJsCO1pndVL2pwNzdJ1Y1863'
});

const ref=firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://shoopi-c4b3f-default-rtdb.firebaseio.com/",
    storageBucket: "gs://shoopi-c4b3f.appspot.com"
});
const bucket = firebase.storage().bucket();

firebaseClient.initializeApp({
    apiKey: "AIzaSyB87F3a5neNThoOeDt6R5DtDIcjgeip03Y",
    authDomain: "shoopi-c4b3f.firebaseapp.com",
    databaseURL: "https://shoopi-c4b3f-default-rtdb.firebaseio.com",
    projectId: "shoopi-c4b3f",
    storageBucket: "shoopi-c4b3f.appspot.com",
    messagingSenderId: "116994288002",
    appId: "1:116994288002:web:e3ad65242bb67dc150879b",
    measurementId: "G-FEZLVEPBB4"
})

//session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: new FirebaseStore({
        database: ref.database(),
    }),
    saveUninitialized: false,
    cookie:{ maxAge:1000 * 60 * 60 * 24} //  it is in milisecond 24 hours
}))


app.use(flash())

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(fileUpload());

const db=firebase.database();

app.use(express.static('public'))
app.use('/css',express.static(__dirname+'public/css'))
app.use('/img',express.static(__dirname+'public/img'))
app.use(express.static('resources'))
app.use('/js',express.static(__dirname+'resources/js'))

app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))

app.set('view engine' , 'ejs')


require('./routes/web')(app,db,firebaseClient,firebase,upload)


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}` )
})