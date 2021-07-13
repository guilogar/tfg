'use strict';

const CropPhytosanitary = require('../../database/models/CropPhytosanitary');
const FarmableLandCrop = require('../../database/models/FarmableLandCrop');
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

  const crops = await FarmableLandCrop.findAll({
    where: {
      FarmableLandId: farmId
    }
  });

  for(const crop of crops) {
    await CropPhytosanitary.create({
      FarmableLandId: farmId,
      CropId: crop.CropId,
      PhytosanitaryId: 1
    });
  }
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
