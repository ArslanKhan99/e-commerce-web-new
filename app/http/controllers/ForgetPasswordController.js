function ForgetPasswordController()
{
    return{
        getFPassword(req,res)
        {
            res.render('forgetPassword',{
                phone:'+92 302 4082569'})
        }
    }
}

module.exports= ForgetPasswordController