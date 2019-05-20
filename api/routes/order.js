const express       = require('express');
const router     = express.Router();
const controller = require('../controllers/orderController');

router.get('/',controller.getOrder);

router.post('/',controller.addProductToOrder);

router.patch('/',controller.changeQuantityProduct);

router.delete('/',controller.deleteProductFromOrder);


module.exports = router;
