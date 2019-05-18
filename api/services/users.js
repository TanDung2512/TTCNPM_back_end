const user_db    = require('../models/userModel');
const Sequelize  = require('sequelize');
const Op         = Sequelize.Op;

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

    findAllLikeAndLimit : async (userName, limit) => {
        var res = await user_db.findAll({
            where: { user_email: { [Op.like]: '%' + userName + '%'} },
            limit: limit
        })

        return res;
    },

    findLimit : async (page, limit) => {
        limit = parseInt(limit);
        offset = (parseInt(page) - 1) * limit;
        
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

    update : async(email, updateData) => {
        console.log(email);
        console.log(updateData);
        var res = await user_db.update(
            {
                user_phone : updateData.user_phone,
                is_female : updateData.is_female,
                user_firstname : updateData.user_phone,
                user_lastname : updateData.user_lastname,
                user_address : updateData.user_address,
                role_id : updateData.role_id,
            },
            {
                where : {
                    user_email : email
                }
            }
        );

        return res;
    }

}
