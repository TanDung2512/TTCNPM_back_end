
const products = require('../services/products');

exports.get_top_rated = (req,res,next) => {
  products.getTop('product_rating',req.query.amount-'0')
  .then( products => {
      let products_response = products.map(element => element.dataValues);
      res.status(200).json({
        products : products_response
      })
  })
}

exports.get_top_seller = (req,res,next) => {
  products.getTop('product_amount',req.query.amount-'0')
  .then( products => {
      let products_response = products.map(element => element.dataValues);
      res.status(200).json({
        products : products_response
      })
  })
}

exports.get_top_sale = (req,res,next) => {
  products.getSaleProduct(req.query.amount-'0')
  .then( products => {
      let products_response = products.map(element => element.dataValues);
      res.status(200).json({
        products : products_response
      })
  })
}



exports.get_page_product = (req,res,next) => {
  products.getPageProduct(req.query.offset-'0')
  .then( products => {
      let products_response = products.map(element => element.dataValues);
      res.status(200).json({
        products : products_response
      })
  })
}

exports.get_new_product = (req,res,next) => {
  products.getTop('sale_date',req.query.amount-'0')
  .then( products => {
      let products_response = products.map(element => element.dataValues);
      res.status(200).json({
        products : products_response
      })
  })
}

exports.get_product = (req,res,next) => {

  products.getProduct(req.query.product_id)
  .then( products => {
      let products_response = products.map(element => element.dataValues);
      res.status(200).json({
        products : products_response
      })
  })
}
