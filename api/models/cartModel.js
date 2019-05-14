const Sequelize   = require('sequelize');
const Model       = Sequelize.Model;
const sequelize   = require('../../utils/mysql_connection.js');
const user        = require('./userModel');
const product     = require('./productModel');
class carts extends Model {}

carts.init({

  user_id     : {
    type      : Sequelize.INTEGER,
    allowNull : false,
    primaryKey: true,
    field     : 'user_id',
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
}, {
  sequelize,
  modelName: 'carts',
  updatedAt: false,
  createdAt: false,
});
carts.hasOne(user,{foreignKey : 'user_id'});
carts.hasMany(product, {foreignKey : 'product_id'})
module.exports = carts;
