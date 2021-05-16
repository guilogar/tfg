const { Model, DataTypes } = require('sequelize');

const sequelize = require('../sequelize');

class Event extends Model {}

Event.init({
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  modelName: 'Event',
  freezeTableName: true,
  tableName: 'Event',
  timestamps: true,
});

module.exports = Event;
