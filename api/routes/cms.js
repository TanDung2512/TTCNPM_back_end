const express    = require("express");
const router     = express.Router();
const jwt        = require('jsonwebtoken');
const keys       = require('../../config/keys');
const checkAuthCms = require('../middleware/checkAdmin');

const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');

router.get("/user-management", checkAuthCms , function(req, res, next) {
    let userInfo = req.decoded;

    return res.render("cms/userManagement", {userInfo: userInfo});
});

router.get("/product-management", checkAuthCms, function (req, res) {
    let userInfo = req.decoded;

    return res.render("cms/productManagement", {userInfo: userInfo});
});

router.get("/user-information", checkAuthCms, function (req, res) {
    let userInfo = req.decoded;

    return res.render("cms/userInformation", {userInfo: userInfo});
});

// LOGIN PAGE
router.get("/login", function (req, res) {
    return res.render("login");
});

router.get("/cms" ,checkAuthCms ,function (req, res) {
    let userInfo = req.decoded;

    return res.render("index", {userInfo: userInfo});
});

router.post("/cms" ,adminController.admin_sign_in);

module.exports = router;
