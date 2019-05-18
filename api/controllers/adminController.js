const mysql = require('mysql')
const key = require('../../config/keys');
const bcrypt     = require('bcrypt');
const jwt        = require('jsonwebtoken');
const saltRounds = 10;

const userService = require("../services/users");

const con = mysql.createConnection({
    host: key.MYSQL_HOST,
    user: key.MYSQL_USERNAME,
    password: key.MYSQL_PASSWORD,
    database: key.MYSQL_DB_NAME
})

con.connect((err) => {
    if(err) throw err
})

module.exports = {
    getAllProduct : (req, res, next) => {
        con.query('SELECT * FROM products', (err, result, fields) => {
            if(err) throw err
            let response = {
                length: result.length,
                numOfPages: result.length % 10 == 0 ? Math.floor(result.length/10) : Math.floor(result.length/10) + 1,
            }
            res.send(response)
        })
    },
    searchProductByName : (req, res, next) => {
        con.query(`SELECT * FROM products WHERE product_name LIKE '${req.params.search}%'`, (err, result, fields) => {
            if(err) throw err
            let response = {
                length: result.length,
                numOfPages: result.length % 10 == 0 ? Math.floor(result.length/10) : Math.floor(result.length/10) + 1,
                data: result
            }
            console.log(response)
            res.send(response)
        })
    },
    insertProduct : (req, res, next) => {
        con.query(`INSERT INTO products (product_id, product_name, product_type, product_brand, product_category, product_amount, product_price, product_description)
        VALUES ('${req.body.id}', '${req.body.name}', '${req.body.type}', '${req.body.brand}', '${req.body.category}', ${req.body.amount}, ${req.body.price}, '${req.body.desc}')`, (err, result, fields) => {
            if(err) {
                console.log(err);
                res.send("CREATE UNSUCCESSFUL")
            }
            else{

                res.send("CREATE SUCCESSFUL")
            }
        })
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
