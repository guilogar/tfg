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
    type: {
        type: DataTypes.ENUM('Irrigation', 'DryLand', 'GreenHourse', 'OpenLand')
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
    timestamps: false,
});

FarmableLand.belongsTo(User);

module.exports = FarmableLand;
