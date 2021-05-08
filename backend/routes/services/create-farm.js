const FarmableLand = require('../../database/models/FarmableLand');

const createFarm = async(
  userId, name, type, image, haveIOT, area, isSquare
) => {
  return await FarmableLand.create({
    UserId: userId,
    name: name,
    type: type,
    image: image,
    haveIOT: haveIOT,
    area: area,
    isSquare: isSquare,
  });
};

module.exports = {
  createFarm
}
