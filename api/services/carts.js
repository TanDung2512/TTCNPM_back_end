const cart_db    = require('../models/cartModel');
const sequelize  = require('sequelize');
const product_db = require('../models/productModel');
const Op = sequelize.Op;

module.exports = {
    get_cart_list : async (user_id) => {
        var res = await cart_db.findAll({
          include : [{
            model : product_db,
            attributes : ['product_name', 'product_id' , 'product_image_url', 'product_price' ],
          }],
          where : {
            user_id : user_id,
          }

        })

        return res;
    },
    get_cart_product : async (user_id,product_id) => {
        var res = await cart_db.findOne({
          include : [{
            model : product_db,
            attributes : ['product_name', 'product_id' , 'product_image_url', 'product_price' ],
            where : {
              product_id : product_id,
            }
          }],
          where : {
            user_id    : user_id,
          }
        })
        return res;
    },
    insert_cart_product : async (user_id,product_id) => {

      var res = await cart_db.findOrCreate({
        where : {
          user_id :  user_id,
          product_id :  product_id,
      }
    })
    return res
  },

  delete_cart_product : async (user_id,product_id) => {
    var res = await cart_db.destroy({
      where : {
        user_id :  user_id,
        product_id :  product_id,
    }
  })
  return res
  }
}
