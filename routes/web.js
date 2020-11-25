const homeController= require('../app/http/controllers/HomeController')
const loginController= require('../app/http/controllers/LoginController')
const forgetPasswordController = require('../app/http/controllers/ForgetPasswordController')
const contactController = require('../app/http/controllers/ContactController')

function initRoutes(app)
{

    app.get('/' , homeController().getHome)

    app.get('/login',loginController().getLogin)

    app.get('/forgetPassword', forgetPasswordController().getFPassword)

    app.get('/contactUs', contactController().getContact)


}

module.exports = initRoutes