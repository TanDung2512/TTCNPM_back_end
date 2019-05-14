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

router.get('/computer', controller.search_computer);

router.get('/smartphone',controller.search_smartphone );

router.get('/TV', controller.search_TV);

router.get('/camera', controller.search_camera);

router.get('/headphone', controller.search_headphone);

module.exports = router;
