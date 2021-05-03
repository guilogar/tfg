const Event = require('../../database/models/Event');
const UserEvent = require('../../database/models/UserEvent');
const UserSensor = require('../../database/models/UserSensor');

const checkEvent = async (cosmosData = []) => {
  let eventsCheck = [];

  const events = await Event.findAll();
  for(const event of events)
  {
    for(const item of cosmosData)
    {
      const value = item[event.name.toLowerCase()];
      const sensorId = item['sensorId'];

      const usersEvents = await UserEvent.findAll();
      for(const userEvent of usersEvents)
      {
        if(value > userEvent.maxValue || value < userEvent.minValue)
        {
          const sensor = await UserSensor.findOne({
            where: {
              id: sensorId
            }
          });

          if(sensor)
          {
            eventsCheck.push({
              userId: sensor.UserId,
              sensorId: sensor.id,
              eventId: event.id,
              userEventId: userEvent.id,
              value: value
            });
          }
        }
      }
    }
  }

  return eventsCheck;
};

module.exports = {
  checkEvent
};
