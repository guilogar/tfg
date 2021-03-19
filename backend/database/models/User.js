const { Model, DataTypes } = require('sequelize');

const sequelize = require('../sequelize');

class User extends Model {}

User.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    fullname: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN
}, { sequelize, modelName: 'user' });

module.exports = User;