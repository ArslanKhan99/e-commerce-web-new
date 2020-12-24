const homeController= require('../app/http/controllers/HomeController')
const loginController= require('../app/http/controllers/LoginController')
const forgetPasswordController = require('../app/http/controllers/ForgetPasswordController')
const contactController = require('../app/http/controllers/ContactController')
const AboutusController=  require('../app/http/controllers/AboutusController')
const ProductController= require('../app/http/controllers/ProductDetailController')
const CartController= require('../app/http/controllers/CartController')
const CheckoutController= require('../app/http/controllers/CheckoutController')
const ShippingreviewController= require('../app/http/controllers/ShippingreviewController')
const ProductsController= require('../app/http/controllers/ProductsController')

function initRoutes(app,db,firebase,firebaseAdmin,upload)
{

    app.get('/' , homeController(db,firebase).getHome)

    app.get('/login',loginController(db,firebase).getLogin)

    app.get('/logout',loginController(db,firebase).logout)

    app.post('/login-user',loginController(db,firebase).checkLogin)

    app.post('/register-user',loginController(db,firebase).register)

    app.get('/forgetPassword', forgetPasswordController().getFPassword)

    app.get('/contactUs', contactController().getContact)

    app.get('/aboutUs', AboutusController().getAboutus)

    app.get('/productdetail', ProductController(db,firebase).getProductDetail)

    app.get('/cart', CartController().getCart)

    app.get('/checkout', CheckoutController().getCheckout)

    app.get('/shippingreview', ShippingreviewController().getShippingreview)

    app.get('/products', ProductsController(db,firebaseAdmin,upload,firebase).getProducts)

    app.get('/add-product', ProductsController(db,firebaseAdmin,upload,firebase).addProduct)

    app.post('/add-product-server', ProductsController(db,firebaseAdmin,upload,firebase).addProductToServer)

    app.post('/update-cart',CartController(db,firebase).updateCart)

}

module.exports = initRoutes