const express    = require("express");
const router     = express.Router();
const controller = require('../controllers/cartController');
const checkAuth = require('../middleware/checkAuth');

router.get("/",checkAuth,controller.get_cart_list);

router.post("/",checkAuth,controller.insert_product_cart);
//
router.delete("/",checkAuth,controller.delete_product_cart);

module.exports = router
