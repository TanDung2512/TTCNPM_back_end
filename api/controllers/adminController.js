const mysql = require('mysql')
const keys = require('../../config/keys');

const con = mysql.createConnection({
    host: keys.MYSQL_HOST,
    user: keys.MYSQL_USERNAME,
    password: keys.MYSQL_PASSWORD,
    database: keys.MYSQL_DB_NAME
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
  }

}
