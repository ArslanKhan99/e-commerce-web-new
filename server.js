const express = require('express')

const app=express()

const ejs= require ('ejs')
const expressLayout = require( 'express-ejs-layouts')

const PORT= process.env.PORT || 3000

app.use(express.static('public'))
app.use('/css',express.static(__dirname+'public/css'))
app.use('/js',express.static(__dirname+'public/js'))
app.use('/img',express.static(__dirname+'public/img'))


const path= require ('path')

app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))

app.set('view engine' , 'ejs')

app.get('/' , (req,res) =>{
        res.render('home',{
            phone:'+92 302 4082569',
            discount1:'10',
            discount2:'40',

            featured_products:[
                {
                    type:"Men",
                    name:"Hassnain",
                    rating:"4",
                    price:"$900.00",
                    imageUrl:"https://i.ibb.co/Lt4cpM4/92c11dbbdfda0877ce07e6e813d12ffb-513581445706.jpg"
                },
                {
                    type:"child",
                    name:"Arslan",
                    rating:"4",
                    price:"$800.00",
                    imageUrl:"https://i.ibb.co/qRJkBHw/Ayeza-9-1.jpg"
                }
            ]

        })
    }
)

app.get('/login',(req,res)=>
{
    res.render('login',{
    phone:'+92 302 4082569'})
})


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}` )
})