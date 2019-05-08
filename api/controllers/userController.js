const jwt        = require("jsonwebtoken");
const key        = require("../../config/keys");
const user_db    = require('../models/userModel');
const bcrypt     = require('bcrypt');
const saltRounds = 10;

exports.user_sign_in = (req,res,next) => {
  let user = req.body;
  user_db.findAll({
    where: {
      user_email : user.user_email,
    }
  })
  .then(search_user => {
    if(search_user.length === 0){
      res.status(200).json({
        success : false,
        message : 'Incorrect username or password',
      })
    }
    console.log(user, search_user);
    bcrypt.compare(user.user_password,search_user[0].user_password)
    .then( match => {
      if(match){
        let user_token = jwt.sign({
          user_email    : search_user[0].user_email,
          user_phone    : search_user[0].user_phone,
          role_id       : search_user[0].role_id,
          is_female     : search_user[0].is_female,
          user_firstname: search_user[0].user_firstname,
          user_lastname : search_user[0].user_lastname,
          user_address  : search_user[0].user_address,
        },key.PRIVATE_KEY)

        res.status(200).json({
          success : true,
          message : 'Authentication successful',
          token   : user_token,
        });
      } else {
        res.status(200).json({
          success : false,
          message : 'Incorrect username or password',
        });
      }
    })
    .catch( err => {
      console.log("here");
    })
  })
}


exports.user_sign_up = (req,res,next) => {
  let user = req.body;
  /*
    check whether account already created or not
  */
  user_db.findAll({
    where: {
      user_email : user.user_email,
    }
  })
  .then(search_user => {

    if( search_user.length === 0 ){
      /*
          Hash password
      */

      bcrypt.hash(user.user_password, saltRounds)
      .then( hash => {
        user_db.create({
          user_email    : user.user_email,
          user_password : hash,
          user_phone    : user.user_phone,
          role_id       : 1,
          is_female     : Number(user.is_female),
          user_firstname: user.user_firstname,
          user_lastname : user.user_lastname,
          user_address  : user.user_address,
        })
        .then( _ => {
          res.send("successful");
        })
      })

      /*
          Insert into database
      */


    }
    else{
      res.send("aldready created ");
    }
  })
}
