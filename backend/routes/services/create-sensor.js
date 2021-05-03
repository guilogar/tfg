const UserSensor = require('../../database/models/UserSensor');

const createSensor = async(userId, measure, name = undefined) => {
  let userSensor = await UserSensor.create({
    name: name,
    measure: measure,
    UserId: userId
  });

  if(!name)
  {
    await userSensor.update({
      name: `Sensor number ${userSensor.id}`
    });
  }
  return userSensor;
};

module.exports = {
  createSensor
}
