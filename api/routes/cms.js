const express    = require("express");
const router     = express.Router();

router.get("/", function (req, res) {
    return res.render("index");
});

router.get("/user-management", function (req, res) {
    return res.render("cms/userManagement");
});

module.exports = router;


