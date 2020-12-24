/*
function LoginController(db, firebase) {
    return {
        async getLogin(req, res) {
            res.render('login')

            await firebase.auth().signInWithEmailAndPassword('arslanhabib234@gmail.com','123456') //Here where I want to grab the user with email and password
                .then((user) => {
                    currentUser = user.toJSON();
                    console.log("Here is new user hassnain")
                    console.log(currentUser.uid)
                    const ref = db.ref("User").child(currentUser.uid);

                    const userData = {
                        created_at:2133332221,
                        email:"hhn14232211@gmail.com",
                        last_login:223423423,
                        name:"Arslan",
                        phone:"+92 3053289765",
                        profileImage:"url",
                        uid:currentUser.uid
                    }

                    ref.set(userData).then((response)=>{
                        console.log(response);
                    })


                }).catch(err => {
                    console.log('Email or password invalid!');
                });

            if (!currentUser) {
                return
            }
            ;
        }
    }
}

module.exports = LoginController
*/

function LoginController(db,firebase){
    return {
        getLogin(req,res)
        {
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
            res.render('login',{cartQty:qty,isLogin:isLogin})
        },
        checkLogin(req,res)
        {
            const {emailTxt,passwordTxt} = req.body
            /*const email = itemsData.email;
            const password = itemsData.password;*/
            firebase.auth().signInWithEmailAndPassword(emailTxt, passwordTxt)
                .then((user) => {
                    console.log(user)
                    // return res.redirect('/')
                    return res.redirect('/');
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorMessage);
                    return res.redirect('/login');
                    // return res.redirect('/login')
                });
        },
        register(req,res){
            const {firstName,middleName,lastName,emailR,passwordR,cPasswordR} = req.body;
            const name = firstName+' ' +middleName+' ' + lastName;

            firebase.auth().createUserWithEmailAndPassword(emailR, passwordR)
                .then((user) => {
                    let uid = firebase.auth().currentUser.uid;
                    console.log(uid)
                    let userData = {
                        uid:uid,
                        email:emailR,
                        name:name
                    }
                    const ref = db.ref("User").child(uid)

                    ref.set(userData,(error)=>{
                        if (error){
                            console.log(error.message)
                        }else{
                            return res.redirect('/login');
                        }
                    });
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorMessage);
                });
        },logout(req,res){
            firebase.auth().signOut();
            res.redirect('/');
        }
    }
}

module.exports=LoginController