'use strict';

const Irrigate = require('../../database/models/Irrigate');

const TemperatureAction = async () => {
  console.log('TemperatureAction');
};

const HumidityAction = async () => {
  console.log('HumidityAction');
};

module.exports = {
  TEMPERATUTE: TemperatureAction,
  HUMIDITY: HumidityAction
};