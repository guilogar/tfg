const Auth = require('./Auth');
const User = require('./User');
const UserSettings = require('./UserSettings');
const FarmableLand = require('./FarmableLand');
const Event = require('./Event');
const UserEvent = require('./UserEvent');
const Phytosanitary = require('./Phytosanitary');
const Crop = require('./Crop');
const FarmableLandCrop = require('./FarmableLandCrop');
const CropPhytosanitary = require('./CropPhytosanitary');
const FirebaseToken = require('./FirebaseToken');
const UserSensor = require('./UserSensor');
const Irrigate = require('./Irrigate');
const Notification = require('./Notification');

module.exports = [
  User, UserSettings, Auth,
  FarmableLand, Event, UserEvent, Crop,
  Phytosanitary, FarmableLandCrop,
  CropPhytosanitary, FirebaseToken,
  UserSensor, Irrigate, Notification
];
