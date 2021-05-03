const FirebaseToken = require('../../database/models/FirebaseToken');

const createFirebaseToken = async(userId, token) => {
  return await FirebaseToken.create({
    token: token,
    UserId: userId
  });
};

module.exports = {
  createFirebaseToken
};
