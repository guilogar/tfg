const { Model, DataTypes } = require('sequelize');

const sequelize = require('../sequelize');
const User = require('./User');

class Auth extends Model {}

Auth.init({
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  jwt: {
    type: DataTypes.STRING
  },
  expires: {
    type: DataTypes.DATE
  }
}, {
  sequelize,
  modelName: 'Auth',
  freezeTableName: true,
  tableName: 'Auth',
  timestamps: true,
});

Auth.prototype.isValid = function() {
  return (
    new Date(this.expires).getTime() >= new Date().getTime()
  );
}

Auth.belongsTo(User);

module.exports = Auth;
