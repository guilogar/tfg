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
    type: DataTypes.ENUM('AUTOMATIC', 'MANUAL')
  },
  minValue: {
    type: DataTypes.DOUBLE
  },
  maxValue: {
    type: DataTypes.DOUBLE
  }
}, {
  sequelize,
  modelName: 'UserEvent',
  freezeTableName: true,
  tableName: 'UserEvent',
  timestamps: false,
});

UserEvent.belongsTo(User);
UserEvent.belongsTo(Event);

module.exports = UserEvent;
