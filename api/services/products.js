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
    },

    findAllLikeAndLimit : async (product_name, limit) => {
      var res = await product_db.findAll({
          where: { product_name: { [Op.like]: '%' + product_name + '%'} },
          limit: limit
      })

      return res;
    },

    findById:  async (product_id) => {
        var res = await product_db.findAll({
            where: {
              product_id : product_id
            }
        })

        return res[0];
    },

    create : async (product) => {
      var res = await product_db.create({
          product_image_url : product.product_img_url,
          product_description : product.product_description,
          product_name : product.product_name,
          product_category : product.product_category,
          product_color : product.product_color,
          product_brand : product.product_brand,
          product_type : product.product_type,
          product_price : product.product_price,
          product_amount: product.product_amount,
          product_weight : product.product_weight,
      });

      return res;
    },

    updateByName : async(product_name, updateData) => {
        var res = await product_db.update(
            {
              product_image_url : updateData.product_img_url,
              product_description : updateData.product_description,
              product_name : updateData.product_name,
              product_category : updateData.product_category,
              product_color : updateData.product_color,
              product_brand : updateData.product_brand,
              product_type : updateData.product_type,
              product_price : updateData.product_price,
              product_amount: updateData.product_amount,
              product_weight : updateData.product_weight,
            },
            {
                where : {
                  product_name : product_name
                }
            }
        );

        return res;
    },

    delete : async (product_id) => {
      var res = await product_db.destroy({
          where: {
            product_id : product_id
          }
      });

      return res;
    },

    getDate: () => {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        return yyyy + '/' + mm + '/' + dd;
    },
}
