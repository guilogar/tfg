const Auth = require('./Auth');
const User = require('./User');
const UserSettings = require('./UserSettings');
const FarmableLand = require('./FarmableLand');
const MethodPay = require('./MethodPay');
const Event = require('./Event');
const UserEvent = require('./UserEvent');

module.exports = [
    User, UserSettings, Auth,
    FarmableLand, MethodPay,
    Event, UserEvent
];