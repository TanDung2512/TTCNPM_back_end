const jwt = require('jsonwebtoken');
const keys= require('../../config/keys');

  checkAuthCms = (req,res,next) => {
    let token = req.cookies.jwtToken;
    console.log(token);
    
    if (token == undefined) {
        return res.render("login");
    }
    if(token.startsWith('Bearer ')){
      token = token.slice(7, token.length);
    }
    if(token){
      jwt.verify(token, keys.PRIVATE_KEY, (err, decoded) => {
        if(err){
          return res.json({
            success: false,
            message: 'Token is not valid',
          })
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } 
    else {
      return res.json({
        success : false,
        message : 'Auth token is not supplied',
      });
    }
  },

module.exports = checkAuthCms;
