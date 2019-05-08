const express    = require("express");
const router     = express.Router();
const controller = require('../controllers/userController');

router.post("/signin",controller.user_sign_in);

router.post("/signup",controller.user_sign_up);

module.exports = router;
