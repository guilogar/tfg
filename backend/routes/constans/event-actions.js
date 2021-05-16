'use strict';

const Irrigate = require('../../database/models/Irrigate');

const OpenCeilingGreenHouseAction = async () => {
  console.log('OpenCeilingGreenHouseAction');
};

const IrrigateAction = async () => {
  console.log('IrrigateAction');
};

const FertilizerAction = async () => {
  console.log('FertilizerAction');
};

const OpenWallGreenhouseAction = async () => {
  console.log('OpenWallGreenhouseAction');
};

module.exports = {
  'OpenCeilingGreenHouse': OpenCeilingGreenHouseAction,
  'Irrigate': IrrigateAction,
  'Fertilizer': FertilizerAction,
  'OpenWallGreenhouse': OpenWallGreenhouseAction,
};
