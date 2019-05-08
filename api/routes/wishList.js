const express    = require("express");
const router     = express.Router();
const controller = require('../controllers/wishListController');
const checkAuth = require('../middleware/checkAuth');

router.get('/',checkAuth,controller.get_wish_list);

router.post('/',checkAuth,controller.insert_product_to_wish_list);

router.delete('/',checkAuth,controller.delete_product_in_wish_list);
