const sequelize = require('../database/sequelize');
const models = require('../database/models/models');
const { createUser } = require('../routes/services/create-user');
const { createSensor } = require('../routes/services/create-sensor');

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

// Create base data to development
async function insertDataTable()
{
  // Insert user to test system
  const user = await createUser(
    'test',
    'test',
    'Guillermo López García'
  );

  for(let i = 0; i < 100; i++)
  {
    const measure = (Math.random() > 0.5 ? 'Temperature' : 'Humidity')
    createSensor(user.id, measure);
  }
}

module.exports = {
  rebuildTables, truncateTables, insertDataTable
};
