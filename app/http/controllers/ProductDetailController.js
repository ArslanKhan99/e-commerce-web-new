function ProductDetail(db,firebase){
    return {
        getProductDetail(req,res)
        {
            const id = req.query.id

            const ref = db.ref("Products").child(id);

            ref.on("value",(snapshot)=>{
                let isLogin = false;
                if (firebase.auth().currentUser != null) {
                    isLogin = true;
                }
                const data = snapshot.val();
                res.render('ProductDetail',{product:data,isLogin:isLogin})
            })
        }
    }
}

module.exports=ProductDetail