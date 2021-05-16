const { Model, DataTypes } = require('sequelize');

const sequelize = require('../sequelize');

class User extends Model {}

User.init({
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true
  },
  password: DataTypes.STRING,
  salt:   DataTypes.STRING,
  fullname: DataTypes.STRING,
  isActive: DataTypes.BOOLEAN
}, {
  sequelize,
  modelName: 'User',
  freezeTableName: true,
  tableName: 'User',
  timestamps: true,
});

module.exports = User;
