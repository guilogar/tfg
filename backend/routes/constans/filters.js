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

const getFilterEvent = (filter) => {
  return [
    sequelize.where(
      sequelize.cast(sequelize.col('UserEvent.action'), 'varchar'),
      {
        [Op.iLike]: `%${filter}%`
      }
    ),
    sequelize.where(
      sequelize.cast(sequelize.col('UserEvent.minValue'), 'varchar'),
      {
        [Op.iLike]: `%${filter}%`
      }
    ),
    sequelize.where(
      sequelize.cast(sequelize.col('UserEvent.maxValue'), 'varchar'),
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

module.exports = {
  getFilterFarm, getFilterEvent
};
