const { Model, DataTypes } = require('sequelize');

const sequelize = require('../sequelize');
const User = require('./User');

class MethodPay extends Model {}

MethodPay.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    type: {
        type: DataTypes.ENUM('PayPal', 'BankAccount')
    }
}, {
    sequelize,
    modelName: 'MethodPay',
    freezeTableName: true,
    tableName: 'MethodPay',
    timestamps: false,
});

MethodPay.belongsTo(User);

module.exports = MethodPay;