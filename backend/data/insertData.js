const User = require('../database/User');
const sequelize = require('../database/sequelize');

// Insert users
async function insertUsers()
{
    await sequelize.sync();
    await User.destroy({
        where: {},
        truncate: true
    });
    await sequelize.sync();

    for(let i = 0; i < 15; i++)
    {
        await User.create({
            username: 'perico',
            password: 'perico' + i,
            fullname: 'perico perez',
            isActive: true
        });
    }
    await sequelize.sync();
}

module.exports.renewal = async () => {
    await insertUsers();
};