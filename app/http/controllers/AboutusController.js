function AboutusController(){
    return {
        getAboutus(req,res)
        {
            res.render('aboutus',{
                phone:'+92 302 4082569'})
        }
    }
}

module.exports=AboutusController