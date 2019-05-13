const express    = require("express");
const router     = express.Router();
const controller = require('../controllers/userController');

router.get('/top-rate');

router.get('/top-sale');

router.get('/page-product');

router.get('/best-seller');
