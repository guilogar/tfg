const Event = require('../../database/models/Event');
const UserEvent = require('../../database/models/UserEvent');

const createEvent = async(name, description) => {
  return await Event.create({
    name: name,
    description: description
  });
};

const assignEventToUser = async(
  userId, eventId, action,
  minValue = 0.0, maxValue = 0.0
) => {
  return await UserEvent.create({
    UserId: userId,
    EventId: eventId,
    action: action,
    minValue: minValue,
    maxValue: maxValue
  });
};

module.exports = {
  createEvent, assignEventToUser
}
