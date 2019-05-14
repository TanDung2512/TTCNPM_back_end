const express    = require("express");
const router     = express.Router();
const controller = require('../controllers/searchController');


/*
  localhost:3000/search/allcategory
*/
router.post('/allcategory', controller.search_allcategory);

/*
  product_name
  res.status(200).json({
})
*/

router.post('/computer', controller.search_computer);

router.post('/smartphone',controller.search_smartphone );

router.post('/TV', controller.search_TV);

router.post('/camera', controller.search_camera);

router.post('/headphone', controller.search_headphone);

module.exports = router;
