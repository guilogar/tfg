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
const {
  sendNotificationToUser
} = require('./routes/services/send-notification-to-user');
const {
  getAllEventFromCosmos, removeEventsFromCosmos
} = require('./routes/services/get-event-from-cosmos');
const {
  checkEvent
} = require('./routes/services/check-event');

const ACTIONS = require('./routes/constans/event-actions');

const UserSensor = require('./database/models/UserSensor');
const Event = require('./database/models/Event');
const Notification = require('./database/models/Notification');
const UserSettings = require('./database/models/UserSettings');
const FarmableLand = require('./database/models/FarmableLand');

const initCronTab = () => {
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
          },
          include: [
            { model: FarmableLand }
          ]
        });

        const event = await Event.findOne({
          where: {
            id: eventId
          }
        });

        const userSettings = await UserSettings.findOne({
          where: {
            id: userId
          }
        });

        if(action === 'AUTOMATIC' ||
          (
            action === 'SETTINGS' &&
            userSettings.defaultEventAction === 'AUTOMATIC'
          )
        )
        {
          const actionFunction = ACTIONS[event.name];
          await actionFunction(userSensor.FarmableLand.id);
        }

        const body = (
          action === 'AUTOMATIC' ||
          (
            action === 'SETTINGS' &&
            userSettings.defaultEventAction === 'AUTOMATIC'
          )
        ) ?
          `El Evento ${event.name} ha sido disparado con el ` +
          `sensor "${userSensor.name}" y en el terreno ${userSensor.FarmableLand.name}. ` +
          `Se ha realizado la accion automatizada.`
          :
          `El Evento ${event.name} ha sido disparado con el ` +
          `sensor "${userSensor.name}" y en el terreno ${userSensor.FarmableLand.name}. ` +
          `Clicke aquí para realizar la acción asociada al evento.`;

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
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      }

      try {
        await removeEventsFromCosmos(items);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = {
  initCronTab
};
