const { Model, DataTypes } = require('sequelize');

const sequelize = require('../sequelize');
const User = require('./User');

class Auth extends Model {}

Auth.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    jwt: {
        type: DataTypes.STRING
    },
    expires: {
        type: DataTypes.DATE
    }
}, {
    sequelize,
    modelName: 'Auth',
    freezeTableName: true,
    tableName: 'Auth',
    timestamps: false,
});

Auth.prototype.isValid = () => {
    console.log(new Date(this.expires));
    console.log(new Date(DataTypes.NOW));
    return (new Date(this.expires) >= new Date(DataTypes.NOW));
}

Auth.belongsTo(User);

module.exports = Auth;