const express    = require("express");
const router     = express.Router();
const controller = require('../controllers/cartController');
// const checkAuth = require('../middleware/checkAuth');

// router.get('/',controller.get_cart_list);

router.post("/",controller.insert_product_cart);
//
// router.delete('/',controller.delete_product_cart);

module.exports = router
