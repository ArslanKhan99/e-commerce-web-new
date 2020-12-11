const homeController= require('../app/http/controllers/HomeController')
const loginController= require('../app/http/controllers/LoginController')
const forgetPasswordController = require('../app/http/controllers/ForgetPasswordController')
const contactController = require('../app/http/controllers/ContactController')
const AboutusController=  require('../app/http/controllers/AboutusController')

function initRoutes(app,db)
{

    app.get('/' , homeController(db).getHome)

    app.get('/login',loginController().getLogin)

    app.get('/forgetPassword', forgetPasswordController().getFPassword)

    app.get('/contactUs', contactController().getContact)

    app.get('/aboutUs', AboutusController().getAboutus)


}

module.exports = initRoutes