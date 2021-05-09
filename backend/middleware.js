const Auth = require('./database/models/Auth');
const User = require('./database/models/User');
const { Op } = require('sequelize');
const { verifyToken } = require('./utils/jwt');

const middleware = async (req, res, next) => {
  try
  {
    const token = (req.headers['authorization'] !== null) ? req.headers['authorization'].split(' ')[1] : null;
    if (token)
    {
      const auth = await Auth.findOne({
        where: {
          jwt: token,
          expires: {
            [Op.gt]: new Date()
          }
        }
      });

      if(auth && auth.isValid())
      {
        const user = await User.findOne({
          where: {
            id: auth.UserId
          }
        });
        const verify = verifyToken(user.username, user.salt, token);

        if(verify)
        {
          req.username = user.username;
          next();
        } else
        {
          throw new Error('token cannot be verified');
        }
      } else
      {
        throw new Error('token invalid');
      }
    } else
    {
      throw new Error('token not send');
    }
  } catch(err)
  {
    res.status(401).send({
    msg: (Object.keys(err).length === 0) ? 'token not send' : err
    });
  }
}

const unless = (paths, middleware) => {
  return (req, res, next) => {
  // res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  for (const path of paths)
  {
    if(path.path === req.path && path.method === req.method)
    return next();
  }
  return middleware(req, res, next);
  };
};

module.exports = {
  middleware, unless
};
