const cartService = require("../services/carts");



exports.get_cart_list = (req,res,next) => {

}

exports.insert_product_cart = (req,res,next) => {

  const cart_info =  res.body.user_id;
  console.log(cart_info)
  cartService.insert_cart_product(cart_info.user_id-'0',cart_info.product_id)
  .then(result => {
    res.status(200).json({
      success : true,
      message : "success add to cart"
    })
  })
}

exports.delete_product_cart = (res,req,next) => {

}
