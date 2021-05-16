const { Model, DataTypes } = require('sequelize');

const sequelize = require('../sequelize');
const User = require('./User');

class Notification extends Model {}

Notification.init({
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  title: DataTypes.TEXT,
  body: DataTypes.TEXT
}, {
  sequelize,
  modelName: 'Notification',
  freezeTableName: true,
  tableName: 'Notification',
  timestamps: true,
});

Notification.belongsTo(User);

module.exports = Notification;
