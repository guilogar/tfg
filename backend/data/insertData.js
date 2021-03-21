const User = require('../database/models/User');
const sequelize = require('../database/sequelize');
const { setPassword } = require('../utils/password');

// Re-build all tables
async function rebuildTables()
{
    await sequelize.sync({
        force: true
    });
}

// Remove users
async function removeUsers()
{
    await sequelize.sync();
    await User.destroy({
        where: {},
        truncate: true
    });
    await sequelize.sync();
}

// Insert users
async function insertUsers()
{
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

module.exports = {
    renewal: async () => {
        await rebuildTables();
        await removeUsers();
        await insertUsers();
    },
    rebuildTables,
    removeUsers,
    insertUsers
};