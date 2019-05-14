const jwt        = require("jsonwebtoken");
const key        = require("../../config/keys");
const user_db    = require('../models/userModel');
const bcrypt     = require('bcrypt');
const saltRounds = 10;

const userService = require("../services/users");

module.exports = {
  user_sign_in : (req,res,next) => {
    let userInputMail = req.body.user_email;
    let userInputPassword = req.body.user_password;
    /* * * * * * * * * * * * * * * * * *
    search_user =
    {
      user_mail : xxx,
      user_id : xxx,
      ....
      is_female : 1,
    }
    * * * * * * * * * * * * * * * * * * */

    userService.find(userInputMail)
    .then(search_user => {

      if(search_user.length === 0){
        res.status(200).json({
          success : false,
          message : 'Incorrect Username',
        })
      }
      else {
        // Compare user inputting password and found user' password
        bcrypt.compare(userInputPassword, search_user.user_password)
        .then( match => {
          if(match){
            let user_token = jwt.sign({
              user_email    : search_user.user_email,
              user_phone    : search_user.user_phone,
              role_id       : search_user.role_id,
              is_female     : search_user.is_female,
              user_firstname: search_user.user_firstname,
              user_lastname : search_user.user_lastname,
              user_address  : search_user.user_address,
            },key.PRIVATE_KEY);

            res.status(200).json({
              success : true,
              message : 'Authentication successful',
              token   : user_token,
            });
          }
          else {
            res.status(200).json({
              success : false,
              message : 'Incorrect password',
            });
          }
        })
        .catch( err => {
          console.log("Error : " + err);
        });
      }
    })
    .catch( err => {
      console.log("Error : " + err);
    });
  },

  user_sign_up : (req,res,next) => {
    let user = req.body;

    //  check whether account already created or not
    userService.find(user.user_email)
    .then(search_user => {
      console.log(search_user);
      if( search_user == undefined ){

        //Hash password
        bcrypt.hash(user.user_password, saltRounds)
        .then( hash => {
          // Assign hash password to user
          user['user_password'] = hash;
          user['role_id'] = 1;

          // Create new user
          console.log(user);
          userService.create(user)
          .then( result => {
            res.send({
              message : "Successfully created",
              flag : true,
            });
          })
        })


      }
      else{
        res.send({
          message : "Fail to sign up",
          flag : 0
        });
      }
    })
  },

  userLimitSearch : (req,res,next) => {
    let offset = req.query.offset;
    let limit = req.query.limit;

    userService.findLimit(offset, limit)
    .then(search_users => {
      res.send(search_users);
    })
    .catch( err => {
      console.log("Error : " + err);
    });
  },

  userSearch : (req,res,next) => {
    let email = req.body.user_email;

    userService.find(email)
    .then(search_user => {
      res.send(search_user);
    })
    .catch( err => {
      console.log("Error : " + err);
    });
  },

  userDelete : (req,res,next) => {
    let email = req.query.email;

    userService.delete(email)
    .then(search_user => {
      res.send("Success deleting");
    })
    .catch( err => {
      res.send("Error when deleting")
    });
  },

  // End module
}
