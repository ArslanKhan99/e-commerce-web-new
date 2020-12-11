function HomeController(db) {
    return {
        async getHome(req,res) {
            const ref = db.ref("Home");
            ref.on("value",function(snapshot){
                const data = snapshot.val();
                console.log(data);
                res.render("home",data)
            },function (errorObject) {
                console.log(errorObject.code)
            })
        }
    }
}


module.exports= HomeController