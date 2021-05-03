const sequelize = require('../database/sequelize');
const models = require('../database/models/models');
const { createUser } = require('../routes/services/create-user');
const { createSensor } = require('../routes/services/create-sensor');
const { createEvent, assignEventToUser } = require('../routes/services/create-event');
const { createFirebaseToken } = require('../routes/services/create-firebase-token');

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
    await createSensor(user.id);
  }

  const eventTemperature = await createEvent('TEMPERATURE', 'Temperature Event');
  const eventHumidity = await createEvent('HUMIDITY', 'Humidity Event');
  await assignEventToUser(
    user.id, eventTemperature.id,
    'AUTOMATIC', 20, 25
  );

  await assignEventToUser(
    user.id, eventHumidity.id,
    'AUTOMATIC', 60, 65
  );

  await createFirebaseToken(
    user.id,
    'clCwbQFtRniHqXbIEAJw7k:APA91bEPXfL5UtQGYM2tZ7tnWfgnpiq95AlCEznEJhmOqXMFP1M8yTMIQQgSXW4uCWM9Qm0DiatEsG6ulHTxFGE4LgmA8LtQ__Kpsg0ME6dj5taId4mlwlCdwb3jMVPbDgAStGPEONY6'
  );
}

module.exports = {
  rebuildTables, truncateTables, insertDataTable
};
