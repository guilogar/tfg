const { Model, DataTypes } = require('sequelize');

const sequelize = require('../sequelize');

class Crop extends Model {}

Crop.init({
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
  },
  alias: {
    type: DataTypes.STRING
  },
  weeks: {
    type: DataTypes.INTEGER
  }
}, {
  sequelize,
  modelName: 'Crop',
  freezeTableName: true,
  tableName: 'Crop',
  timestamps: true,
});

module.exports = Crop;
