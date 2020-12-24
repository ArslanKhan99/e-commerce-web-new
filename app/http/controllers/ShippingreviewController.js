function ShippingreviewController(){
    return {
        getShippingreview(req,res)
        {
            res.render('shippingreview',{
                phone:'+92 302 4082569'})
        }
    }
}

module.exports=ShippingreviewController