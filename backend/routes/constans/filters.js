'use strict';

const { Op } = require('sequelize');
const sequelize = require('../../database/sequelize');

const getFilterFarm = (filter) => {
  return [
    {
      name: {
        [Op.iLike]: `%${filter}%`
      }
    },
    sequelize.where(
      sequelize.cast(sequelize.col('FarmableLand.type'), 'varchar'),
      {
        [Op.iLike]: `%${filter}%`
      }
    ),
    sequelize.where(
      sequelize.cast(sequelize.col('FarmableLand.area'), 'varchar'),
      {
        [Op.iLike]: `%${filter}%`
      }
    ),
  ];
};

const getFilterCrop = (filter) => {
  return [
    sequelize.where(
      sequelize.cast(sequelize.col('FarmableLand.name'), 'varchar'),
      {
        [Op.iLike]: `%${filter}%`
      }
    ),
    sequelize.where(
      sequelize.cast(sequelize.col('Crop.name'), 'varchar'),
      {
        [Op.iLike]: `%${filter}%`
      }
    ),
    sequelize.where(
      sequelize.cast(sequelize.col('Crop.alias'), 'varchar'),
      {
        [Op.iLike]: `%${filter}%`
      }
    ),
    sequelize.where(
      sequelize.cast(sequelize.col('Crop.description'), 'varchar'),
      {
        [Op.iLike]: `%${filter}%`
      }
    ),
    sequelize.where(
      sequelize.cast(sequelize.col('Crop.weeks'), 'varchar'),
      {
        [Op.iLike]: `%${filter}%`
      }
    ),
  ];
};

const getFilterPhytosanitary = (filter) => {
  return [
    sequelize.where(
      sequelize.cast(sequelize.col('Phytosanitary.name'), 'varchar'),
      {
        [Op.iLike]: `%${filter}%`
      }
    ),
    sequelize.where(
      sequelize.cast(sequelize.col('Phytosanitary.description'), 'varchar'),
      {
        [Op.iLike]: `%${filter}%`
      }
    ),
    sequelize.where(
      sequelize.cast(sequelize.col('Phytosanitary.alias'), 'varchar'),
      {
        [Op.iLike]: `%${filter}%`
      }
    ),
    sequelize.where(
      sequelize.cast(sequelize.col('FarmableLand.name'), 'varchar'),
      {
        [Op.iLike]: `%${filter}%`
      }
    ),
    sequelize.where(
      sequelize.cast(sequelize.col('Crop.name'), 'varchar'),
      {
        [Op.iLike]: `%${filter}%`
      }
    ),
    sequelize.where(
      sequelize.cast(sequelize.col('Crop.alias'), 'varchar'),
      {
        [Op.iLike]: `%${filter}%`
      }
    ),
    sequelize.where(
      sequelize.cast(sequelize.col('Crop.description'), 'varchar'),
      {
        [Op.iLike]: `%${filter}%`
      }
    ),
    sequelize.where(
      sequelize.cast(sequelize.col('Crop.weeks'), 'varchar'),
      {
        [Op.iLike]: `%${filter}%`
      }
    ),
  ];
};

const getFilterEvent = (filter) => {
  return [
    sequelize.where(
      sequelize.cast(sequelize.col('UserEvent.action'), 'varchar'),
      {
        [Op.iLike]: `%${filter}%`
      }
    ),
    sequelize.where(
      sequelize.cast(sequelize.col('Event.name'), 'varchar'),
      {
        [Op.iLike]: `%${filter}%`
      }
    ),
    sequelize.where(
      sequelize.cast(sequelize.col('Event.description'), 'varchar'),
      {
        [Op.iLike]: `%${filter}%`
      }
    ),
  ];
};

const getFilterIrrigate = (filter) => {
  return [
    sequelize.where(
      sequelize.cast(sequelize.col('Irrigate.amountWater'), 'varchar'),
      {
        [Op.iLike]: `%${filter}%`
      }
    ),
    sequelize.where(
      sequelize.cast(sequelize.col('Irrigate.lengthMinutes'), 'varchar'),
      {
        [Op.iLike]: `%${filter}%`
      }
    ),
    sequelize.where(
      sequelize.cast(sequelize.col('FarmableLand.name'), 'varchar'),
      {
        [Op.iLike]: `%${filter}%`
      }
    ),
    sequelize.where(
      sequelize.cast(sequelize.col('FarmableLand.type'), 'varchar'),
      {
        [Op.iLike]: `%${filter}%`
      }
    ),
    sequelize.where(
      sequelize.cast(sequelize.col('FarmableLand.area'), 'varchar'),
      {
        [Op.iLike]: `%${filter}%`
      }
    ),
  ];
};

const getFilterNotification = (filter) => {
  return [
    {
      title: {
        [Op.iLike]: `%${filter}%`
      }
    },
    {
      body: {
        [Op.iLike]: `%${filter}%`
      }
    },
  ];
};

module.exports = {
  getFilterFarm, getFilterCrop, getFilterPhytosanitary,
  getFilterEvent, getFilterIrrigate, getFilterNotification
};
