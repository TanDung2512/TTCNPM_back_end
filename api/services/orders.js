const orderModel = require('../models/orderModel');
const productService = require('./products');
const products = require('../models/orderModel');
module.exports = {
  getAllOrderUser : async (user_id) => {
    const AllOrder = await orderModel.findAll({
      where : {
        user_id : user_id,
      }
    })
    return AllOrder;
  },
  findCurrentOrder : async (user_id) => {
    const currentOrder = await orderModel.findOne({
      where : {
        user_id : user_id,
        order_status : 0,
      }
    })
    return currentOrder;
  },
  deleteProductInOrder : () => {

  },

  createNewOrder : async (user_id) => {
    const newOrder = await orderModel.create({
      order_date : "new Date()",
      order_status : 0 ,
      order_sum_value : 0.0,
      user_id : user_id,
    })
    return newOrder
  },

  insertProductToOrder :  (user_id, product_id, quantity) => {
    module.exports.findCurrentOrder(user_id)
    .then(result => {
      productService.getProduct(product_id)
      .then(result_1 => {
        result.addProduct(result_1,{through : {product_quantity : quantity}})
        .then(result_2 => {

          return result_2
        })
      })
    })

  },
};
