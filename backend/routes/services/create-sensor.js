const UserSensor = require('../../database/models/UserSensor');

const createSensor = async(userId, name = undefined) => {
  let userSensor = await UserSensor.create({
    name: name,
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
