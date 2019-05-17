const express    = require("express");
const router     = express.Router();
const jwt        = require('jsonwebtoken');
const keys       = require('../../config/keys');
const checkAuth = require('../middleware/checkAdmin');

const userController = require('../controllers/userController');

router.get("/index", checkAuthCms, function (req, res) {
    let token = req.query.token;
    let decoded = jwt.verify(token, keys.PRIVATE_KEY);

    return res.render("index" , {token : token, userInfo: decoded});
});

router.get("/user-management", checkAuthCms , function(req, res, next) {
    let token = req.query.token;
    let decoded = jwt.verify(token, keys.PRIVATE_KEY);

    return res.render("cms/userManagement", {token : token, userInfo: decoded});
});

router.get("/product-management", checkAuthCms, function (req, res) {
    let token = req.query.token;
    let decoded = jwt.verify(token, keys.PRIVATE_KEY);

    return res.render("cms/productManagement", {token : token, userInfo: decoded});
});

// LOGIN PAGE
router.get("/login", function (req, res) {
    return res.render("login");
});

// HANDLE LOGIN LOGIC
router.post("/cms", userController.user_sign_in);

module.exports = router;
