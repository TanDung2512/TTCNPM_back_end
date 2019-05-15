const express    = require("express");
let mysql = require('mysql')
const router     = express.Router();
const controller = require('../controllers/productController');
const controllerProducts = require('../controllers/productsController');

var cors = require('cors')

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecommerce'
})

con.connect((err) => {
    if(err) throw err
})

router.get('/rate',controller.get_top_rated);

router.get('/top-rate');

router.get('/sale',controller.get_top_sale);
//
router.get('/page-product',controller.get_page_product);
//
router.get('/bestseller',controller.get_top_seller);

router.get('/newproduct',controller.get_new_product);

router.get('/detail',controller.get_product);

router.get('/', cors(), (req, res, next) => {
    con.query('SELECT * FROM products', (err, result, fields) => {
        if(err) throw err
        let response = {
            length: result.length,
            numOfPages: result.length % 10 == 0 ? Math.floor(result.length/10) : Math.floor(result.length/10) + 1,
        }
        res.send(response)
    })
})

router.get('/page/:page', cors(), (req, res, next) => {
    con.query(`SELECT * FROM products LIMIT ${10} OFFSET ${(req.params.page-1) * 10}`, (err, result, fields) => {
        if(err) throw err
        let response = {
            length: result.length,
            data: result
        }
        res.send(response)
    })
})

router.get('/search/:search', cors(), (req, res, next) => {
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
})

router.post('/create', cors(), (req, res, next) => {
    con.query(`INSERT INTO products (product_name, product_type, product_brand, product_category, product_amount, product_price, product_description)
    VALUES ('${req.body.name}', '${req.body.type}', '${req.body.brand}', '${req.body.category}', '${req.body.amount}', '${req.body.price}', '${req.body.desc}')`, (err, result, fields) => {
        if(err) {
            res.send("CREATE UNSUCCESSFUL")
        }
        else{
            res.send("CREATE SUCCESSFUL")
        }
    })
})

module.exports = router
