const User = require('../../database/models/User');
const { setPassword } = require('../../utils/password');

const createUser = async(username, password, fullname) => {
  const { hash, salt } = setPassword(password);
  return await User.create({
    username: username,
    password: hash,
    salt: salt,
    fullname: fullname,
    isActive: true
  });
};

module.exports = {
  createUser
};
