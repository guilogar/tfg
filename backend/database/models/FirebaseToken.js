const { Model, DataTypes } = require('sequelize');

const sequelize = require('../sequelize');
const User = require('./User');

class FirebaseToken extends Model {}

FirebaseToken.init({
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  token: {
    type: DataTypes.TEXT,
    unique: true
  }
}, {
  sequelize,
  modelName: 'FirebaseToken',
  freezeTableName: true,
  tableName: 'FirebaseToken',
  timestamps: false,
});

FirebaseToken.belongsTo(User);

module.exports = FirebaseToken;
