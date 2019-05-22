const express    = require("express");
const router     = express.Router();
const multer     = require('multer');
const fs         = require('fs');
const shell      = require('shelljs');

const controller = require('../controllers/productController');
const adminController = require('../controllers/adminController');

// Define storeage to store uploaded images
const imageStorage = multer.diskStorage({
    // define destination to store
    destination: function (req, file, cb) {
        // define saving file path
        var savPath = './public/img/uploads/';
        // check path is existed or not
        if (!fs.existsSync(savPath)) {
            shell.mkdir('-p', savPath);
        }
        cb(null, savPath);
    },
    // define file name
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Upload Image
const imageUpload = multer({ storage: imageStorage });

router.get('/rate',controller.get_top_rated);

router.get('/top-rate');

router.get('/sale',controller.get_top_sale);
//
router.get('/page-product',controller.get_page_product);
//
router.get('/bestseller',controller.get_top_seller);

router.get('/newproduct',controller.get_new_product);

router.get('/detail',controller.get_product);

// Control Management System

router.get('/search-limit', adminController.productLimitSearch)

router.get('/search', adminController.productSearch)

router.post('/create', adminController.productCreate)

router.get('/update-product', adminController.productUpdateByName)

router.get('/find-product', adminController.productFindInfo)

router.get('/delete-product', adminController.productDelete)

// Upload Image to server

router.post("/upload-image", imageUpload.single("file"), (req, res) => {
    res.send();
});

module.exports = router
