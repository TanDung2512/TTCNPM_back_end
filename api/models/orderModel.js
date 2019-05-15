const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const sequelize    = require('../../utils/mysql_connection.js');

class order extends Model {}

user.init({

  user_id     : {
    type      : Sequelize.INTEGER,
    allowNull : false,
    field     : 'user_id'
    references: {
      model : 'users',
      key   : 'user_id'
    }
  },
  product_id  : {
    type      : Sequelize.STRING,
    primaryKey: true,
    field     : 'product_id',
    allowNull : false,
    references: {
      model : 'products',
      key   : 'product_id'
    }
  }
  order_quantity : {
    type      : Sequelize.INTEGER,
    field     : 'order_quantity',
  }
}, {
  sequelize,
  modelName: 'cart',
  updatedAt: false,
  createdAt: false,
});

module.exports = order;
