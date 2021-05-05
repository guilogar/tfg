const Phytosanitary = require('../../database/models/Phytosanitary');

const createPhytosanitary = async (name, description, alias) => {
  return await Phytosanitary.create({
    name: name,
    description: description,
    alias: alias
  });
};

module.exports = {
  createPhytosanitary
};
