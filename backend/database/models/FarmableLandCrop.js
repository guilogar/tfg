const { Model, DataTypes } = require('sequelize');

const sequelize = require('../sequelize');
const FarmableLand = require('./FarmableLand');
const Crop = require('./Crop');

class FarmableLandCrop extends Model {}

FarmableLandCrop.init({
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  }
}, {
  sequelize,
  modelName: 'FarmableLandCrop',
  freezeTableName: true,
  tableName: 'FarmableLandCrop',
  timestamps: true,
});

FarmableLandCrop.belongsTo(FarmableLand);
FarmableLandCrop.belongsTo(Crop);

module.exports = FarmableLandCrop;
