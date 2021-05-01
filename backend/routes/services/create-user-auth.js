const User = require('../../database/models/User');
const Auth = require('../../database/models/Auth');
const FirebaseToken = require('../../database/models/FirebaseToken');
const { Op } = require("sequelize");
const { setPassword } = require('../../utils/password');
const { generateToken } = require('../../utils/jwt');
const { sumHourToDate } = require('../../utils/date');

const createUserAuth = async (username, password, firebaseToken) => {
    let user = await User.findOne({
        where: {
            username: username
        }
    });

    if(user)
    {
        const { hash } = setPassword(password, user.salt);
        user = await User.findOne({
            where: {
                username: username,
                password: hash
            }
        });
    }

    let token = null;

    if(user)
    {
        let auth = await Auth.findOne({
            where: {
                UserId: user.id,
                expires: {
                    [Op.gt]: new Date()
                }
            }
        });

        if(!auth || !auth.isValid())
        {
            // 1 * 60 * 60 * 1000 = 1 hour
            const { token } = generateToken(
                user.username, user.salt,
                Math.floor(Date.now() / 1000) + (60 * 60)
            );
            auth = await Auth.create({
                jwt: token,
                expires: sumHourToDate(new Date(), 1),
                UserId: user.id
            });
        }

        if(firebaseToken)
        {
          const firebase = await FirebaseToken.findOne({
            where: {
              token: firebaseToken
            }
          });

          if(!firebase) {
            await FirebaseToken.create({
              token: firebaseToken,
              UserId: user.id
            });
          }
        }

        token = auth.jwt;
    }

    return token;
};

module.exports = {
    createUserAuth
};
