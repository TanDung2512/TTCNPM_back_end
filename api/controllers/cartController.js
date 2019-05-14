const cartService = require("../services/carts");



exports.get_cart_list = (req,res,next) => {
  const user_info =  req.query;
  console.log(user_info)
  cartService.get_cart_list(user_info.user_id)
  .then(result => {
    res.status(200).json({
      success : true,
      carts : result,
    })
  })
}

exports.insert_product_cart = (req,res,next) => {

  const cart_info =  req.body;
  console.log(cart_info)
  cartService.insert_cart_product(cart_info.user_id-'0',cart_info.product_id)
  .then( result => {
    if(!result[1]){
      res.status(200).json({
        success      : false,
        message      : "already add to cart",
      })
    }
    else {
      cartService.get_cart_product(result[0].user_id, result[0].product_id)
      .then( data => {
      res.status(200).json({
        success      : true,
        message      : "success add to cart",
        cart_product : data,
      })
    })
    }
  })
}

exports.delete_product_cart = (req,res,next) => {
  const cart_info =  req.body;
  console.log(cart_info)
  cartService.delete_cart_product(cart_info.user_id-'0',cart_info.product_id)
  .then( rowDelete => {
    if(rowDelete == 0){
      res.status(200).json({
        success : false,
        message : "there is no such that product in cart "
      })
    }
    else {
      cartService.get_cart_list(cart_info.user_id)
      .then(result => {
        res.status(200).json({
          success : true,
          message : "success delete to cart",
          carts : result,
        })
      })
    }
  })
}
