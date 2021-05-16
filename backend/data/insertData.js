const sequelize = require('../database/sequelize');
const models = require('../database/models/models');
const { createFarms } = require('./farms');
const { createIrrigate } = require('../routes/services/create-irrigate');
const { createUser } = require('../routes/services/create-user');
const { createSettings } = require('../routes/services/create-settings');
const { createSensor } = require('../routes/services/create-sensor');
const { createEvent, assignEventToUser } = require('../routes/services/create-event');
const { createFirebaseToken } = require('../routes/services/create-firebase-token');
const { createNotification } = require('../routes/services/create-notification');
const { createCrop } = require('../routes/services/create-crop');
const { createPhytosanitary } = require('../routes/services/create-phytosanitary');
const { pNames } = require('./phytosanitaryNames');

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

  await createSettings(user.id, 'es', 'WHITE', 'AUTOMATIC');

  const { farm1, farm2 } = await createFarms(user.id);

  for(let i = 0; i < 100; i++)
  {
    await createSensor(
      user.id, (Math.random() > 0.5) ? farm1.id : farm2.id
    );
  }

  for(let i = 0; i < 5; i++)
  {
    await createIrrigate(
      Math.random() * 30, parseInt(Math.random() * 60),
      (Math.random() > 0.5) ? farm1.id : farm2.id
    );
  }

  let events = [];
  events.push(
    await createEvent('OpenCeilingGreenHouse', 'OpenCeilingGreenHouse Event')
  );
  events.push(
    await createEvent('Irrigate', 'Irrigate Event')
  );
  events.push(
    await createEvent('Fertilizer', 'Fertilizer Event')
  );
  events.push(
    await createEvent('OpenWallGreenhouse', 'OpenWallGreenhouse Event')
  );

  await assignEventToUser(
    user.id, events[0].id, 'AUTOMATIC'
  );

  await assignEventToUser(
    user.id, events[1].id, 'MANUAL'
  );

  for(let i = 0; i < 5; i++)
  {
    const eventNotification = (Math.random() > 0.5) ? events[0] : events[1];

    const title = `Evento ${eventNotification.name}`;
    const body = ((Math.random() > 0.5) ?
    `El Evento ${eventNotification.name} ha sido disparado con el ` +
    `sensor "${parseInt(Math.random() * 10)}". ` +
    `Se ha realizado la accion automatizada.` +
    `Clicke aquí para mas información.`
    :
    `El Evento ${eventNotification.name} ha sido disparado con el ` +
    `sensor "${parseInt(Math.random() * 10)}". ` +
    `Clicke aquí para realizar la acción asociada al evento.`);

    await createNotification(
      title, body, user.id
    );
  }

  await createCrop(
    'PEA', 'El cultivo del guisante al exterior',
    'Guisantes', 8
  );
  await createCrop(
    'BEAN', 'El cultivo del frijol al exterior',
    'Frijol', 8
  );
  await createCrop(
    'POTAT0', 'El cultivo de la papa al exterior',
    'Patata', 10
  );
  await createCrop(
    'TOMATO', 'El cultivo del tomate al invernadero',
    'Tomate', 11
  );
  await createCrop(
    'MELON', 'El cultivo del melón al invernadero',
    'Melon', 12
  );
  await createCrop(
    'WATERMELON', 'El cultivo de la sandía invernadero',
    'Sandía', 12
  );
  await createCrop(
    'WATERMELON', 'El cultivo de la sandía al exterior',
    'Sandía americana', 12
  );

  await createPhytosanitary(
    'SYNTETIC_FERTILIZER', 'Abono sintetico', 'Abono sintetico'
  );
  await createPhytosanitary(
    'POTASH', 'Potasa', 'Potasa'
  );
  for(const pName of pNames) {
    await createPhytosanitary(
      pName, pName.toLowerCase(), pName.toLowerCase()
    );
  }
}

module.exports = {
  rebuildTables, truncateTables, insertDataTable
};
