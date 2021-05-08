const Irrigate = require('../../database/models/Irrigate');

const createIrrigate = async(
  amountWater, lengthMinutes, farmId
) => {
  return await Irrigate.create({
    amountWater: amountWater,
    lengthMinutes: lengthMinutes,
    FarmableLandId: farmId
  });
};

module.exports = {
  createIrrigate
};
