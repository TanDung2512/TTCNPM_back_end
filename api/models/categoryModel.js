const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const sequelize    = require('../../utils/mysql_connection.js');

class user extends Model {}

user.init({
  category_id  : {
    type      : Sequelize.INTEGER,
    field     : 'product_id',
    allowNull : false,
    unique    : true
  },
  category_id  : {
    type      : Sequelize.INTEGER,
    field     : 'product_id',
    allowNull : false,
    unique    : true
  },
  {
  sequelize,
  modelName: 'users',
  updatedAt: false,
  createdAt: false,
});

module.exports = user;
