const { Model, DataTypes } = require('sequelize');

const sequelize = require('../sequelize');
const FarmableLand = require('./FarmableLand');

class Irrigate extends Model {}

Irrigate.init({
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  amountWater: DataTypes.DOUBLE,
  lengthMinutes: DataTypes.DOUBLE
}, {
  sequelize,
  modelName: 'Irrigate',
  freezeTableName: true,
  tableName: 'Irrigate',
  timestamps: true,
});

Irrigate.belongsTo(FarmableLand);

module.exports = Irrigate;
