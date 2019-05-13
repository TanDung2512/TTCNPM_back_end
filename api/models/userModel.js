const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const sequelize    = require('../../utils/mysql_connection.js');

class user extends Model {}

user.init({
  user_email  : {
    type      : Sequelize.STRING,
    allowNull : false,
    field     : 'user_email'
  },
  user_id        : {
    type      : Sequelize.INTEGER,
    primaryKey: true,
    field     : 'user_id',
    autoIncrement : true,
  },
  user_password  : {
    type      : Sequelize.STRING,
    allowNull : false,
    field     : 'user_password'
  },
  user_firstname : {
    type      : Sequelize.STRING,
    allowNull : false,
    field     : 'user_firstname'
  },
  user_lastname  : {
    type      : Sequelize.STRING,
    allowNull : false,
    field     : 'user_lastname'
  },
  user_address   : {
    type      : Sequelize.STRING,
    allowNull : true,
    field     : 'user_address'
  },
  role_id        : {
    type      : Sequelize.INTEGER,
    allowNull : false,
    field     : 'role_id',
    references: {
    key : 'role_id',
    }
  },
  user_phone     : {
    type      : Sequelize.STRING,
    allowNull : true,
    field     : 'user_phone',

  },
  is_female      : {
    type      : Sequelize.INTEGER,
    allowNull : true,
    field     : 'is_female',
  },
}, {
  sequelize,
  modelName: 'users',
  updatedAt: false,
  createdAt: false,
});

module.exports = user;
