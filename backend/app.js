const express = require('express');
const app = express();
const logger = require('morgan');
const http = require('http');
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const baseAPI = '/api/v1';
const cors = require('cors');

const args = process.argv.slice(2);
process.env.ENVFILE = (args[0]) ? args[0] : '.env';

const dotenv = require('dotenv');
dotenv.config({ path: process.env.ENVFILE });

app.use(cors({
  origin: '*'
}));
app.use(bodyParser.json({
  limit: '1024mb'
}));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '1024mb'
}));

const routes = require('./routes/routes');

for (const route of routes) {
  app.use(baseAPI, route);
}

const sequelize = require('./database/sequelize');

(async () => {
  await sequelize.sync();
})();

// # ┌────────────── second (optional)
// # │ ┌──────────── minute
// # │ │ ┌────────── hour
// # │ │ │ ┌──────── day of month
// # │ │ │ │ ┌────── month
// # │ │ │ │ │ ┌──── day of week
// # │ │ │ │ │ │
// # │ │ │ │ │ │
// # * * * * * *
const cron = require('node-cron');
const { sendNotificationToUser } = require('./routes/services/send-notification-to-user');
const { getEventFromCosmos, getAllEventFromCosmos, removeEventsFromCosmos } = require('./routes/services/get-event-from-cosmos');
const { checkEvent } = require('./routes/services/check-event');

const UserSensor = require('./database/models/UserSensor');
const Event = require('./database/models/Event');
const Notification = require('./database/models/Notification');

const ACTIONS = require('./routes/constans/event-actions');

cron.schedule('* * * * *', async () => {
  try
  {
    const items = await getAllEventFromCosmos();
    const eventsFired = await checkEvent(items);
    for (const eventFired of eventsFired)
    {
      const {
        userId, sensorId, eventId,
        userEventId, value, action
      } = eventFired;

      const userSensor = await UserSensor.findOne({
        where: {
          id: sensorId
        }
      });

      const event = await Event.findOne({
        where: {
          id: eventId
        }
      });

      if(action === 'AUTOMATIC') {
        const actionFunction = ACTIONS[event.name];
        await actionFunction();
      }

      const body = (action === 'AUTOMATIC' ?
        `El Evento ${event.name} ha sido disparado con el ` +
        `sensor "${userSensor.name}" y el valor ${value}. ` +
        `Se ha realizado la accion automatizada.` +
        `Clicke aquí para mas información.`
        :
        `El Evento ${event.name} ha sido disparado con el ` +
        `sensor "${userSensor.name}" y el valor ${value}. ` +
        `Clicke aquí para realizar la acción asociada al evento.`);

      const notification = {
        title: `Evento ${event.name}`,
        body: body
      };

      await Notification.create({
        title: notification.title,
        body: notification.body,
        UserId: userId
      });

      try {
        const response = await sendNotificationToUser(userId, notification);
        // console.log(response);
      } catch (error) {
        console.log(error);
      }

      try {
        await removeEventsFromCosmos(items);
      } catch (error) {
        // console.log(error);
      }
    }
  } catch (error) {
    // console.log(error);
  }
});

const server = http.createServer(app);
server.listen(PORT, function() {
    console.log('Server up and running on localhost:' + PORT);
});
