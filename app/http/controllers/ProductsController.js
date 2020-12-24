function ProductsController(db, firebase, upload,firebaseClient) {
    return {
        getProducts(req, res) {
            res.render('products')
        }, addProduct(req, res) {
            let qty = 0;
            if (req.session.cart) {
                qty = req.session.cart.totalQty;
            }
            let isLogin = false;
            if (firebaseClient.auth().currentUser != null) {
                isLogin = true;
            }

            res.render('addProduct', {
                cartQty: qty,
                isLogin: isLogin
            })
        }, addProductToServer(req, res) {
            const {productName, productPrice, productDescription, type, label, discount, isFeatured, isPopular, firstImage} = req.body
            console.log(req.body)
            let featured = false;
            let popular = false;
            if (isFeatured) {
                featured = true
            }
            if (isPopular) {
                popular = true
            }
            let cid = "Dummy CID";
            let pid = new Date().getTime() + Math.random();
            pid = pid.toString().replace('.', '')

            const data = {
                name: productName,
                price: productPrice,
                type: type,
                isFeatured: featured,
                isPopular: popular,
                discount: discount,
                description: productDescription,
                label: label,
                CID: cid,
                PID: pid
            }
            upload(req, res, function (err) {
                if (err) {
                    console.log("Error uploading file.");
                }
                console.log(req.files);
                let file = req.files.firstImage;

                let storageRef = firebase.storage().bucket();
                let finalRef = storageRef.file('products/' + file.name)
                let task = finalRef.put(file);
                task.on('state_changed',
                    function progress(snapshot) {

                        let load = '<h1>Please Wait</h1>' +
                            '<i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i> <span>Loading ...</span>';
                        $.mobile.loading('show', {
                            text: 'Please wait...',
                            textVisible: true,
                            html: load,
                            theme: 'z'
                        });
                    },
                    function error(err) {

                    },
                    function complete() {
                        $.mobile.loading('hide');
                        let ref = db.ref("photos");
                        let downloadURL = task.snapshot.downloadURL;
                        ref.push({
                            name: req.files.firstImage.name,
                            imageurl: downloadURL,
                            photoUrl: "/images/profile_placeholder.png",
                            my_id: "myid",
                        });
                    }
                );
            });
            let ref = db.ref('Products').child(pid);
            ref.set(data, (error) => {
                if (error) {
                    console.log('data Not saved')
                } else {
                    console.log('data saved')
                }
            })

            return res.redirect('/add-product')

        }
    }
}

module.exports = ProductsController