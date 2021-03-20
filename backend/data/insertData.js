const User = require('../database/models/User');
const sequelize = require('../database/sequelize');
const { setPassword } = require('../utils/password');

// Insert users
async function insertUsers()
{
    await sequelize.sync({
        force: true
    });
    await User.destroy({
        where: {},
        truncate: true
    });
    await sequelize.sync();

    for(let i = 0; i < 15; i++)
    {
        const { hash, salt } = setPassword('perico');
        await User.create({
            username: `perico${i}`,
            password: hash,
            salt: salt,
            fullname: 'perico perez',
            isActive: true
        });
    }
    await sequelize.sync();
}

module.exports.renewal = async () => {
    await insertUsers();
};