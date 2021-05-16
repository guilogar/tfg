const Event = require('../../database/models/Event');
const UserEvent = require('../../database/models/UserEvent');
const UserSensor = require('../../database/models/UserSensor');

const checkEvent = async (cosmosData = []) => {
  let eventsCheck = [];

  for(const item of cosmosData)
  {
    const sensorId = item['sensorId'];
    const usersEvents = await UserEvent.findAll({
      include: [
        { model: Event }
      ]
    });

    for(const userEvent of usersEvents)
    {
      const value = item['EventFired'];
      if(value === userEvent.Event.name)
      {
        await userEvent.update({
          countFired: (++userEvent.countFired)
        });

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
            eventId: userEvent.EventId,
            userEventId: userEvent.id,
            action: userEvent.action,
            value: value
          });
        }
      }
    }
  }
  return eventsCheck;
};

module.exports = {
  checkEvent
};
