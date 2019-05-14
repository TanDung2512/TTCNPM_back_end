const user_db    = require('../models/productModel');
const Sequelize  = require('sequelize')

module.exports = {
  search_allcategory : (req,res,next) => {
   	const {term} = req.body;
   	products.findAll(
   	)
   		res.status(200).json({
          success : false,
          message : 'Incorrect Username',
        })
  },

  search_TV : (req,res,next) => {
   	products.findAll({
   		where:{
   			product_id : 2
   		}
   	});
  },

  search_computer : (req,res,next) => {
   	products.findAll({

   	});
  },

  search_smartphone : (req,res,next) => {
   	products.findAll({

   	});
  },

  search_camera : (req,res,next) => {
   	products.findAll({

   	});
  },

  search_headphone : (req,res,next) => {
   	products.findAll({

   	});
  }
}