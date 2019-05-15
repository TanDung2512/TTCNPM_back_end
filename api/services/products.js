const product_db    = require('../models/productModel');
const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = {
    getTop : async (property,amount) => {
        var res = await product_db.findAll({
            limit : amount,
            order : [
              [ sequelize.col(property),'DESC'],
            ]
        })

        return res;
    },

    getSaleProduct : async (amount) => {
      var res = await product_db.findAll({
        limit : amount,
        where : {
          sale_date : {
          [Op.ne]: null
          }
        },
        order : [
          [sequelize.col('sale_price')],
        ]
      })

      return res;
    },
    getPageProduct : async (offset) => {
      var res = await product_db.findAll({
        offset : offset,
        limit  : 10,
      })

      return res;
    },
    getProduct : async (product_id) => {
      var res = await product_db.findAll({
          where :{
            product_id : product_id,
          }
      })

      return res;
    }
}
