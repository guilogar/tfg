const { Model, DataTypes } = require('sequelize');

const sequelize = require('../sequelize');
const User = require('./User');
const Event = require('./Event');

class UserEvent extends Model {}

UserEvent.init({
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  action: {
    type: DataTypes.ENUM('AUTOMATIC', 'MANUAL', 'SETTINGS')
  },
  countFired: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  UserId: {
    type: DataTypes.INTEGER,
    unique: 'compositeIndex'
  },
  EventId: {
    type: DataTypes.INTEGER,
    unique: 'compositeIndex'
  },
}, {
  sequelize,
  modelName: 'UserEvent',
  freezeTableName: true,
  tableName: 'UserEvent',
  timestamps: true,
});

UserEvent.belongsTo(User);
UserEvent.belongsTo(Event);

module.exports = UserEvent;
