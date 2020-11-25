function ContactController(){
    return {
        getContact(req,res)
        {
            res.render('contactus',{
                phone:'+92 302 4082569'})
        }
    }
}

module.exports=ContactController