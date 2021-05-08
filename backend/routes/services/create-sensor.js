const UserSensor = require('../../database/models/UserSensor');

const createSensor = async(userId, farmId, name = undefined) => {
  let userSensor = await UserSensor.create({
    name: name,
    UserId: userId,
    FarmableLandId: farmId
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
