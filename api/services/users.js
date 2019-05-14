const user_db    = require('../models/userModel');

module.exports = {
    find:  async (userName) => {
        var res = await user_db.findAll({
            where: {
              user_email : userName
            }
        })

        return res[0];
    },

    findAll : async (userName) => {
        var res = await user_db.findAll({
            where: {
              user_email : userName
            }
        })

        return res;
    },

    findLimit : async (offset, limit) => {
        limit = parseInt(limit);
        offset = parseInt(offset);
        
        var res = await user_db.findAll( {offset : offset, limit : limit})

        return res;
    },

    delete : async (userName) => {
        var res = await user_db.destroy({
            where: {
                user_email : userName
            }
        });

        return res;
    },

    create : async (user) => {
        console.log(user);
        var res = await user_db.create({
            user_email    : user.user_email,
            user_password : user.user_password,
            user_phone    : user.user_phone.toString(),
            role_id       : user.role_id,
            is_female     : user.is_female,
            user_firstname: user.user_firstname,
            user_lastname : user.user_lastname,
            user_address  : user.user_address,
        });

        return res;
    },

}
