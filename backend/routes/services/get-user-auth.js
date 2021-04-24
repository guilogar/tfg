const User = require("../../database/models/User");
const Auth = require("../../database/models/Auth");

const getAuthFromJwt = async(jwt) => {
  return await Auth.findOne({
    where: {
      jwt: jwt
    }
  });
};

const getUserFromJwt = async(jwt) => {
  const auth = await getAuthFromJwt(jwt);
  return await User.findOne({
    where: {
      id: auth.UserId
    }
  });
};

const getJwtFromRequest = (request) => {
  return request.headers['authorization'].split(' ')[1];
};

module.exports = {
  getAuthFromJwt, getUserFromJwt, getJwtFromRequest
}