const { Model, DataTypes } = require('sequelize');

const sequelize = require('../sequelize');
const User = require('./User');

class UserSettings extends Model {}

UserSettings.init({
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  backgroundColor: {
    type: DataTypes.STRING
  },
  defaultLanguage: {
    type: DataTypes.STRING
  },
  defaultEventAction: {
    type: DataTypes.ENUM('AUTOMATIC', 'MANUAL')
  },
  UserId: {
    type: DataTypes.INTEGER,
    unique: true
  },
}, {
  sequelize,
  modelName: 'UserSettings',
  freezeTableName: true,
  tableName: 'UserSettings',
  timestamps: false,
});

UserSettings.belongsTo(User);

module.exports = UserSettings;
