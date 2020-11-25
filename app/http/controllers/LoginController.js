function LoginController(){
    return {
        getLogin(req,res)
        {
            res.render('login',{
                phone:'+92 302 4082569'})
        }
    }
}

module.exports=LoginController