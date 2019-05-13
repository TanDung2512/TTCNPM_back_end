const express    = require("express");
const router     = express.Router();
const controller = require('../controllers/searchController');

/*
  localhost:3000/search/allcategory
*/
router.get('/allcategory', controller.search_allcategory);

/*
  product_name
  res.status(200).json({
})
*/

router.get('/computer', );

router.get('/smartphone', );

router.get('/TV',);

router.get('/camera',);

router.get('/headphone',);
