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

app.get('/' , (req,res) =>{
        res.render('home',{
            phone:'+92 302 4082569',
            discount1:'10',
            discount2:'40',
            no_of_products: 6,
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
            ],
            popular_products:[
                {
                    label: "HOT",
                    category:"SHOES",
                    sub_category: "JOGGERS",
                    name: "PLIMSOLL",
                    rating: "4",
                    price: "199",
                    images: [
                        {
                            url:"https://i.ibb.co/Y7DWhjp/images-1.jpg"
                        },
                        {
                            url:"https://i.ibb.co/5WPvDYX/images.jpg"
                        }
                    ]

                },
                {
                    label: "save",
                    category:"BAGS",
                    sub_category: "shoulder bag",
                    name: "gold chain",
                    rating: "3.7",
                    price: "99",
                    images: [
                        {
                            url:"https://i.ibb.co/Lz9vNYC/images-2.jpg"
                        },
                        {
                            url:"https://i.ibb.co/kHFMkSx/images-3.jpg"
                        }
                    ]

                },
                {
                    label: "Hot",
                    category:"WATCHES",
                    sub_category: "Men",
                    name: "Black step",
                    rating: "4.5",
                    price: "150",
                    images: [
                        {
                            url:"https://i.ibb.co/DRWRqfT/images-4.jpg"
                        },
                        {
                            url:"https://i.ibb.co/ZzGKFHT/50239603-SM-13-f.jpg"
                        }
                    ]

                },
                {
                    label: "New",
                    category:"LAPTOP",
                    sub_category: "Mac",
                    name: "Mac 2020 256",
                    rating: "4.7",
                    price: "1500",
                    images: [
                        {
                            url:"https://i.ibb.co/0hZgq0q/Security-Mac-OS-1139417587.jpg"
                        },
                        {
                            url:"https://i.ibb.co/nCBY3S2/20200623-Pixabay-MAC-apple-3144237-1920.jpg"
                        }
                    ]

                },
                {
                    label: "new",
                    category:"ACCESSORY",
                    sub_category: "Mouse",
                    name: "techno",
                    rating: "3.7",
                    price: "50",
                    images: [
                        {
                            url:"https://i.ibb.co/WxPXyJ1/asus-rog-spatha.jpg"
                        },
                        {
                            url:"https://i.ibb.co/mbx0gkp/images-5.jpg"
                        }
                    ]

                },
                {
                    label: "sale",
                    category:"MOBILES",
                    sub_category: "Samsung",
                    name: "Note 10",
                    rating: "3.7",
                    price: "150",
                    images: [
                        {
                            url:"https://i.ibb.co/jwpZbWB/D1-Aura-White-front-w-pen-23729.jpg"
                        },
                        {
                            url:"https://i.ibb.co/KXN5Ft7/download.jpg"
                        }
                    ]

                },

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