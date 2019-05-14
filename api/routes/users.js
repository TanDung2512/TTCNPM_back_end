const express    = require("express");
const router     = express.Router();
const controller = require('../controllers/userController');

router.post("/signin",controller.user_sign_in);

router.post("/signup",controller.user_sign_up);

router.get("/search-limit",controller.userLimitSearch);

router.get("/delete-user", controller.userDelete);

// router.patch("/promoteadmin",);
module.exports = router;


/*
  get : lay
  post : them moi + tao + bao mat
  patch : thay doi
  delete : xoa

*/
