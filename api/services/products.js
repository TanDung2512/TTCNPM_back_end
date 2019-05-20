const product_db    = require('../models/productModel');
const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = {
    getTop : async (property,amount) => {
        let res = await product_db.findAll({
            limit : amount,
            order : [
              [ sequelize.col(property),'DESC'],
            ]
        })

        return res;
    },

    getSaleProduct : async (amount) => {
      let res = await product_db.findAll({
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
      let res = await product_db.findAll({
        offset : offset,
        limit  : 10,
      })

      return res;
    },

    getProduct : async (product_id) => {
      let res = await product_db.findAll({
          where :{
            product_id : product_id,
          }
      })

      return res;
    }
}
