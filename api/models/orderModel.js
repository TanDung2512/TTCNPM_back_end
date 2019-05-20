const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const sequelize    = require('../../utils/mysql_connection.js');
const user = require('./userModel');
const product = require('./productModel');
class orders extends Model {}

orders.init({

  order_id     : {
    type      : Sequelize.INTEGER,
    allowNull : false,
    primaryKey: true,
    field     : 'order_id',
    autoIncrement : true,

  },
  order_date  : {
    type      : Sequelize.STRING,
    field     : 'order_date',
    allowNull : false,

  },
  order_status : {
    type      : Sequelize.INTEGER,
    field     : 'order_status',
    allowNull : false,
  },
  order_sum_value : {
    type      : Sequelize.FLOAT,
    field     : 'order_sum_value',
    allowNull : false,
  },
  user_id : {
    type      : Sequelize.INTEGER,
    allowNull : false,
    field     : 'user_id'
  }
}, {
  sequelize,
  modelName: 'orders',
  updatedAt: false,
  createdAt: false,
});

orders.belongsTo(user,{foreignKey : 'user_id',targetKey : 'user_id'});
products_orders = sequelize.define('products_orders', {
    product_quantity: Sequelize.INTEGER,

}, {
  updatedAt: false,
  createdAt: false,
})

orders.belongsToMany(product, {through : products_orders,foreignKey: 'order_id',other_key: 'product_id'});
product.belongsToMany(orders, {through : products_orders,foreignKey: 'product_id',other_key: 'order_id'});

module.exports = orders;
