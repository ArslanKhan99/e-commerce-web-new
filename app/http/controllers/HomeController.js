function HomeController(db,firebase) {
    return {
        async getHome(req,res) {
            let ref = db.ref("News");
            let homeModel;
            ref.on("value",function(snapshot){
                const data = snapshot.val();
                homeModel = {News:data};
                ref = db.ref("Products");
                ref.on("value",function(snapshot1){
                    let feature_products = [];
                    let popular_products = [];

                    snapshot1.forEach((childSnapshot)=>{
                        console.log(childSnapshot.val());
                        if (childSnapshot.val().isFeature === true){
                            feature_products.push(childSnapshot.val())
                        }

                        if (childSnapshot.val().isPopular === true){
                            popular_products.push(childSnapshot.val())
                        }
                    });

                    let qty;
                    if (req.session.cart){
                        qty = req.session.cart.totalQty;
                    }else{
                        qty =0;
                    }

                    let isLogin = false;
                    if (firebase.auth().currentUser != null){
                        isLogin = true;
                    }

                    homeModel = {
                        News:data,
                        featured_products:feature_products,
                        popular_products:popular_products,
                        cartQty:qty,
                        isLogin:isLogin
                    };

                    res.render("home",homeModel)
                })
            },function (errorObject) {
                console.log(errorObject.code)
            })
        }
    }
}


module.exports= HomeController