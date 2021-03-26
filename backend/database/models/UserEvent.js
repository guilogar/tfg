const { Model, DataTypes } = require('sequelize');

const sequelize = require('../sequelize');
const User = require('./User');
const Event = require('./Event');

class UserEvent extends Model {}

UserEvent.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    }
}, {
    sequelize,
    modelName: 'UserEvent',
    freezeTableName: true,
    tableName: 'UserEvent',
    timestamps: false,
});

UserEvent.belongsTo(User);
UserEvent.belongsTo(Event);

module.exports = UserEvent;