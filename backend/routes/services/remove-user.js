const User = require('../../database/models/User');

const removeUser = async(username) => {
  return await User.destroy({
    where: {
      username: username
    },
    force: true
  });
};

module.exports = {
  removeUser
};
