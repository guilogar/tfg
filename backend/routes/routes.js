const registryLogin = require('./registry-login');
const users = require('./users');
const farmableLand = require('./farmable-land');
const farmableLandCrop = require('./farmable-land-crop');
const crops = require('./crops');
const events = require('./events');
const settings = require('./settings');
const notifications = require('./notifications');
const phytosanitary = require('./phytosanitarys');
const cropPhytosanitary = require('./crop-phytosanitary');
const irrigates = require('./irrigates');

module.exports = [
  registryLogin, users, farmableLand,
  farmableLandCrop, crops, events,
  settings, notifications, phytosanitary,
  cropPhytosanitary, irrigates
];
