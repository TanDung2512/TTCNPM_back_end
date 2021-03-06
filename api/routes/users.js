const express    = require("express");
const router     = express.Router();
const controller = require('../controllers/userController');

router.post("/signin",controller.user_sign_in);

router.post("/signup",controller.user_sign_up);

router.get("/search-limit",controller.userLimitSearch);

router.get("/search-user", controller.userSearch);

router.get("/delete-user", controller.userDelete);

router.get("/search", controller.userSearch);

router.get("/find-user", controller.userFindInfo);

router.get("/update-user", controller.userUpdate);

module.exports = router;
