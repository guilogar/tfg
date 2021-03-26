const sequelize = require('../database/sequelize');
const models = require('../database/models/models');

// Re-build all tables
async function rebuildTables()
{
    await sequelize.sync({
        force: true
    });
}

// Truncate all tables
async function truncateTables()
{
    for(const model of models)
    {
        await sequelize.sync();
        await model.truncate({ cascade: true });
        await sequelize.sync();
    }
}

module.exports = {
    rebuildTables, truncateTables
};