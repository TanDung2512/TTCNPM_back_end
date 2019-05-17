const Sequelize = require('sequelize');
const keys = require('../config/keys');

const sequelize = new Sequelize(keys.MYSQL_DB_NAME,keys.MYSQL_USERNAME,keys.MYSQL_PASSWORD,{
  host      : keys.MYSQL_HOST,
  port      : keys.MYSQL_PORT,
  dialect   : 'mysql',
  pool      : {
    max : 10,
    min : 0,
    acquire: 30000,
    idle   : 10000,
  }
})



sequelize
 .authenticate()
 .then(() => {
   console.log('Connection has been established successfully.');
 })
 .catch(err => {
   console.error('Unable to connect to the database:', err);
 })

module.exports = sequelize;
