const { Model, DataTypes } = require('sequelize');

const sequelize = require('../sequelize');
const User = require('./User');

class FarmableLand extends Model {}

FarmableLand.init({
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    defaultValue: 'Terreno X'
  },
  type: {
    type: DataTypes.ENUM('Irrigation', 'DryLand', 'GreenHouse', 'OpenLand')
  },
  image: {
    type: DataTypes.TEXT
  },
  haveIOT: {
    type: DataTypes.BOOLEAN
  },
  area: {
    type: DataTypes.DOUBLE
  },
  isSquare: {
    type: DataTypes.BOOLEAN
  }
}, {
  sequelize,
  modelName: 'FarmableLand',
  freezeTableName: true,
  tableName: 'FarmableLand',
  timestamps: true,
});

FarmableLand.belongsTo(User);

module.exports = FarmableLand;
