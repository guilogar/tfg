const { Model, DataTypes } = require('sequelize');

const sequelize = require('../sequelize');
const FarmableLand = require('./FarmableLand');
const Phytosanitary = require('./Phytosanitary');
const Crop = require('./Crop');

class CropPhytosanitary extends Model {}

CropPhytosanitary.init({
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  }
}, {
  sequelize,
  modelName: 'CropPhytosanitary',
  freezeTableName: true,
  tableName: 'CropPhytosanitary',
  timestamps: true,
});

CropPhytosanitary.belongsTo(FarmableLand);
CropPhytosanitary.belongsTo(Phytosanitary);
CropPhytosanitary.belongsTo(Crop);

module.exports = CropPhytosanitary;
