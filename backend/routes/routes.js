const registryLogin = require('./registry-login');
const users = require('./users');
const farmableLand = require('./farmable-land');
const farmableLandCrop = require('./farmable-land-crop');
const crops = require('./crops');
const events = require('./events');
const settings = require('./settings');
const notifications = require('./notifications');

module.exports = [
  registryLogin, users, farmableLand,
  farmableLandCrop, crops, events,
  settings, notifications
];
