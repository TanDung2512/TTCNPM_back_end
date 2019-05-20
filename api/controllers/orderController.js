const orderService = require('../services/orders');

module.exports = {
  getOrder : (req,res,next) => {

  },
  addProductToOrder : (req,res,next) => {
    let infoProductOrder = req.body;
    let result = orderService.insertProductToOrder(infoProductOrder.user_id, infoProductOrder.product_id, infoProductOrder.product_quantity)
    res.status(200).send(result)
  },
  changeQuantityProduct : (req,res,next) => {

  },
  deleteProductFromOrder : (req,res,next) => {

  },
}
