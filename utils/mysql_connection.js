const mysql = require('mysql');
var connection = mysql.createConnection({
  host      : 'localhost',
  user      : 'root',
  password  : '12345',
  database  : 'shop'
})

connection.connect();


module.export = connection;
