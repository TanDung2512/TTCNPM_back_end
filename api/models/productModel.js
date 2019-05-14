const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const sequelize    = require('../../utils/mysql_connection.js');

class products extends Model {}

products.init({
  product_id  : {
    type      : Sequelize.INTEGER,
    primaryKey: true,
    field     : 'product_id',
    allowNull : false,
    unique    : true,
    autoIncrement : true
  },
  product_name: {
    type      : Sequelize.STRING,
    field     : 'product_name',
    allowNull : false
  },
  product_description: {
    type      : Sequelize.STRING,
    field     : 'product_description',
    allowNull : true
  },
  product_type: {
    type      : Sequelize.STRING,
    field     : 'product_type',
    allowNull : true
  },
  product_brand: {
    type      : Sequelize.STRING,
    field     : 'product_brand',
    allowNull : true
  },
  product_price: {
    type      : Sequelize.STRING,
    field     : 'product_price',
    allowNull : true
  },
  product_created: {
    type      : Sequelize.STRING,
    field     : 'product_created',
    allowNull : true
  },
  product_rating: {
    type      : Sequelize.INTEGER,
    field     : 'product_rating',
    allowNull : true
  },
  amount_1_star: {
    type      : Sequelize.INTEGER,
    field     : 'amount_1_star',
    allowNull : true
  },
  amount_2_star: {
    type      : Sequelize.INTEGER,
    field     : 'amount_2_star',
    allowNull : true
  },
  amount_3_star: {
    type      : Sequelize.INTEGER,
    field     : 'amount_3_star',
    allowNull : true
  },
  amount_4_star: {
    type      : Sequelize.INTEGER,
    field     : 'amount_4_star',
    allowNull : true
  },
  amount_5_star: {
    type      : Sequelize.INTEGER,
    field     : 'amount_5_star',
    allowNull : true
  },
  product_amount: {
    type      : Sequelize.INTEGER,
    field     : 'product_amount',
    allowNull : true
  },
  product_reviews: {
    type      : Sequelize.STRING,
    field     : 'product_reviews',
    allowNull : true
  },
  product_image_url: {
    type      : Sequelize.STRING,
    field     : 'product_image_url',
    allowNull : true
  },
  product_category: {
    type      : Sequelize.STRING,
    field     : 'product_category',
    allowNull : true
  },
  product_color: {
    type      : Sequelize.STRING,
    field     : 'product_color',
    allowNull : true
  },
  product_weight: {
    type      : Sequelize.INTEGER,
    field     : 'product_weight',
    allowNull : true
  },
  product_dimensions: {
    type      : Sequelize.STRING,
    field     : 'product_dimensions',
    allowNull : true
  },
  sale_date: {
    type      : Sequelize.DATE,
    field     : 'sale_date',
    allowNull : true
  },
  sale_price: {
    type      : Sequelize.INTEGER,
    field     : 'sale_price',
    allowNull : true
  },},
{
  sequelize,
  modelName: 'products',
  updatedAt: false,
  createdAt: false,
});

module.exports = products;

