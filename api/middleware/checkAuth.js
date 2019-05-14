const jwt = require('jsonwebtoken');
const keys= require('../../config/keys');

  checkAuth = (req,res,next) => {
    let token = req.headers['authorization'];
    
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

module.exports = checkAuth;
