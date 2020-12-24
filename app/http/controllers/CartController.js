function CartController(db,firebase){
    return {
        getCart(req,res)
        {
            let dataForm = [];
            if (req.session.cart) {
                for (let product of Object.values(req.session.cart.items)) {
                    dataForm.push(product)
                }
            }

            let qty = 0;
            if (req.session.cart){
                qty = req.session.cart.totalQty;
            }

            res.render('cart',{
                cartItems:dataForm,
                cartQty:qty
            })
        }
        ,updateCart(req,res) {
            if (firebase.auth().currentUser  != null) {
                const itemsData = req.body
                console.log(itemsData)
                if (!req.session.cart) {
                    req.session.cart = {
                        items: {},
                        totalQty: 0,
                        totalPrice: 0
                    }
                }

                let cart = req.session.cart
                console.log(cart.items)

                if (!cart.items[req.body.PID]) {
                    cart.items[req.body.PID] = {
                        item: {itemsData},
                        qty: 1
                    }
                    cart.totalQty = cart.totalQty + 1
                    cart.totalPrice = cart.totalPrice + req.body.price
                } else {
                    cart.items[req.body.PID].qty = cart.items[req.body.PID].qty + 1
                    cart.totalQty = cart.totalQty + 1
                    cart.totalPrice = cart.totalPrice + req.body.price
                }
                req.session.cart = cart

                return res.json({totalQty: req.session.cart.totalQty})
            }else{
                console.log('auth failed')
            }
        }
    }
}

module.exports=CartController