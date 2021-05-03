const { Model, DataTypes } = require('sequelize');

const sequelize = require('../sequelize');
const User = require('./User');

class UserSensor extends Model {}

UserSensor.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING
}, {
    sequelize,
    modelName: 'UserSensor',
    freezeTableName: true,
    tableName: 'UserSensor',
    timestamps: false,
});

UserSensor.belongsTo(User);

module.exports = UserSensor;
