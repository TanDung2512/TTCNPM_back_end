const express    = require("express");
let mysql = require('mysql')
const router     = express.Router();
var cors = require('cors')
const controller = require('../controllers/userController');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecommerce'
})

con.connect((err) => {
    if(err) throw err
})

router.get('/top-rate');

router.get('/top-sale');

router.get('/page-product');

router.get('/best-seller');

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
        console.log(response)
        res.send(response)
    })
})

module.exports = router