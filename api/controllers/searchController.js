const product_db    = require('../models/productModel');
const Sequelize  = require('sequelize')
const Op = Sequelize.Op;

module.exports = {
  search_allcategory: (req,res,next) => {
    const query = req.body.product_name;
    product_db.findAll({
      where: {
        product_name: {
          [Op.like]: `%${query}%`
        }
      }
    })
    .then(search_product => {
      res.send(search_product);
    })
    .catch( err => {
      console.log("Error : " + err);
    });
  },

  search_smartphone : (req,res,next) => {
    const query = req.body.product_name;
   	product_db.findAll( {where: {
      product_category : 'Smart Phones',
      product_name: {
          [Op.like]: `%${query}%`
      }
    }})
    .then(search_product => {
      res.send(search_product);
    })
    .catch( err => {
      console.log("Error : " + err);
    });
  },

  search_computer : (req,res,next) => {
    const query = req.body.product_name;
   	product_db.findAll( {where: {
      product_category : 'Computer',
      product_name: {
          [Op.like]: `%${query}%`
      }
    }})
    .then(search_product => {
      res.send(search_product);
    })
    .catch( err => {
      console.log("Error : " + err);
    });
  },

  search_TV : (req,res,next) => {
    const query = req.body.product_name;
   	product_db.findAll( {where: {
      product_category : 'TV',
      product_name: {
          [Op.like]: `%${query}%`
      }
    }})
    .then(search_product => {
      res.send(search_product);
    })
    .catch( err => {
      console.log("Error : " + err);
    });
  },

  search_camera : (req,res,next) => {
    const query = req.body.product_name;
   	product_db.findAll( {where: {
      product_category : 'Camera',
      product_name: {
          [Op.like]: `%${query}%`
      }
    }})
    .then(search_product => {
      res.send(search_product);
    })
    .catch( err => {
      console.log("Error : " + err);
    });
  },

  search_headphone : (req,res,next) => {
    const query = req.body.product_name;
   	product_db.findAll( {where: {
      product_category : 'Headphones',
      product_name: {
          [Op.like]: `%${query}%`
      }
    }})
    .then(search_product => {
      res.send(search_product);
    })
    .catch( err => {
      console.log("Error : " + err);
    });
  }
}
