const express    = require("express");
const router     = express.Router();
const controller = require('../controllers/productController');

router.get('/rate',controller.get_top_rated);

router.get('/sale',controller.get_top_sale);
//
router.get('/page-product',controller.get_page_product);
//
router.get('/bestseller',controller.get_top_seller);

router.get('/newproduct',controller.get_new_product);

router.get('/detail',controller.get_product);
module.exports = router;
