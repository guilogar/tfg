const { Model, DataTypes } = require('sequelize');

const sequelize = require('../sequelize');
const User = require('./User');
const Auth = require('./Auth');

class FarmableLand extends Model {}

FarmableLand.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    type: {
        type: DataTypes.ENUM('Irrigation', 'DryLand')
    },
    imageS3Id: {
        type: DataTypes.STRING
    },
    haveIOT: {
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
FarmableLand.belongsTo(Auth);

module.exports = FarmableLand;