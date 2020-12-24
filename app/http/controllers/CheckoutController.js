function CheckoutController(){
    return {
        getCheckout(req,res)
        {
            res.render('checkout',{
                phone:'+92 302 4082569'})
        }
    }
}

module.exports=CheckoutController