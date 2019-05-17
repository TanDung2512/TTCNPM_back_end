const express    = require("express");
const router     = express.Router();
const controller = require('../controllers/productController');
const controllerAdmin = require('../controllers/adminController');

router.get('/rate',controller.get_top_rated);

router.get('/top-rate');

router.get('/sale',controller.get_top_sale);
//
router.get('/page-product',controller.get_page_product);
//
router.get('/bestseller',controller.get_top_seller);

router.get('/newproduct',controller.get_new_product);

router.get('/detail',controller.get_product);

router.get('/page/:page', controllerAdmin.getAllProduct)

router.get('/search/:search', controllerAdmin.searchProductByName)

router.post('/create', controllerAdmin.insertProduct)

module.exports = router
