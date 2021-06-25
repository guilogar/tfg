'use strict';

const Irrigate = require('../../database/models/Irrigate');

const { createIrrigate } = require('../services/create-irrigate');

const OpenCeilingGreenHouseAction = async (farmId) => {
  console.log('OpenCeilingGreenHouseAction');
};

const IrrigateAction = async (farmId) => {
  console.log('IrrigateAction');
  await createIrrigate(100, 10, farmId);
};

const FertilizerAction = async (farmId) => {
  console.log('FertilizerAction');
};

const OpenWallGreenhouseAction = async (farmId) => {
  console.log('OpenWallGreenhouseAction');
};

module.exports = {
  'OpenCeilingGreenHouse': OpenCeilingGreenHouseAction,
  'Irrigate': IrrigateAction,
  'Fertilizer': FertilizerAction,
  'OpenWallGreenhouse': OpenWallGreenhouseAction,
};
