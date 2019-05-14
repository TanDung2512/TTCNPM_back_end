const cart_db    = require('../models/cartModel');
const sequelize = require('sequelize');


module.exports = {
    get_cart_list : async (property,amount) => {
        var res = await cart_db.findAll({
            limit : amount,
            order : [
              [ sequelize.col(property),'DESC'],
            ]
        })

        return res;
    },
    insert_cart_product : async (user_id,product_id) => {

      var res = await cart_db.create({
          user_id    : user_id,
          product_id : product_id,
      });
    }
}
