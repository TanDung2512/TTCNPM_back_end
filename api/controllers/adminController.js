const mysql = require('mysql')
const key = require('../../config/keys');
const bcrypt     = require('bcrypt');
const jwt        = require('jsonwebtoken');

const userService = require("../services/users");
const productService = require("../services/products")

module.exports = {
    productLimitSearch : (req,res,next) => {
        let page = req.query.page;
        let offset = (parseInt(page) - 1) * 10;

        productService.getPageProduct(offset)
        .then(search_products => {
            res.send(search_products);
        })
        .catch( err => {
            console.log("Error : " + err);
        });
    },

    productDelete : (req,res,next) => {
        let product_id = req.query.product_id;
        
        productService.delete(product_id)
        .then(search_user => {
          res.send("Success deleting");
        })
        .catch( err => {
          res.send("Error when deleting")
        });
    },

    productSearch : (req,res,next) => {
        let product_name = req.query.product_name;
        let limit = 10;

        productService.findAllLikeAndLimit(product_name, limit)
        .then(search_products => {
            res.send(search_products);
        })
        .catch( err => {
            console.log("Error : " + err);
        });
    },

    productCreate : (req,res,next) => {
        let data = req.body;

        productService.create(data)
        .then(search_products => {
            res.send(search_products);
        })
        .catch( err => {
            console.log("Error : " + err);
        });
    },

    productUpdateByName : (req,res,next) => {
        let updateData = req.query.updateData;
        let product_name = req.query.product_name;

        productService.updateByName(product_name, updateData)
        .then(search_products => {
            res.send(search_products);
        })
        .catch( err => {
            console.log("Error : " + err);
        });
    },

    productFindInfo: (req,res,next) => {
        let product_id = req.query.productId;

        productService.findById(product_id)
        .then(search_products => {
            res.send(search_products);
        })
        .catch( err => {
            console.log("Error : " + err);
        });
    },

    admin_sign_in : (req,res,next) => {
        let userInputMail = req.body.user_email;
        let userInputPassword = req.body.user_password;
        
        userService.find(userInputMail)
        .then(search_user => {

            if(search_user == undefined){
                return res.render("login", {message: "Your email is incorrect"});
            }
            else {
            // Compare user inputting password and found user' password
                bcrypt.compare(userInputPassword, search_user.user_password)
                .then( match => {
                    // If user is not admin
                    if (search_user.role_id != 0) {
                        return res.render("login", {message: "You do not allow to login "});
                    }

                    if (match) {
                        let user_token = jwt.sign({
                            user_id       : search_user.user_id,
                            user_email    : search_user.user_email,
                            user_phone    : search_user.user_phone,
                            role_id       : search_user.role_id,
                            is_female     : search_user.is_female,
                            user_firstname: search_user.user_firstname,
                            user_lastname : search_user.user_lastname,
                            user_address  : search_user.user_address,
                        },key.PRIVATE_KEY);

                        res.cookie('jwtToken', user_token, { maxAge: 900000, httpOnly: true });
                        res.setHeader('Authorization', user_token);
                        return res.render("index", {userInfo: search_user})
                    }
                    else {
                        return res.render("login", {message: "Your password is incorrect"});
                    }
                })
                .catch( err => {
                    console.log("Error : " + err);
                });
            }
        })
        .catch( err => {
            console.log("Error : " + err);
        });
    },

}
