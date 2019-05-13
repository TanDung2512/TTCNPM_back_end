const express    = require("express");
const router     = express.Router();
const controller = require('../controllers/userController');


router.get('/', (req, res, next) => {
	res.status(200).json({
		message: 'Handling GET'
	});
});


router.post('/', (req, res, next) => {
	res.status(201).json({
		message: 'Handling POST'
	});
});

router.patch('/:productId', (req, res, next) => {
	res.status(200).json({
		message: 'Updated product'
	});
});

router.delete('/:productId', (req, res, next) => {
	res.status(200).json({
		message: 'Deleted product'
	});
});

module.exports = router;