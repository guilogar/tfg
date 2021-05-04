const Crop = require('../../database/models/Crop');

const createCrop = async (name, description, alias, weeks) => {
  return await Crop.create({
    name: name,
    description: description,
    alias: alias,
    weeks: weeks
  });
};

module.exports = {
  createCrop
};
