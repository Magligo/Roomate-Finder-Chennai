const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const RoomImage = sequelize.define('RoomImage', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    room_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true,
    underscored: true
});

module.exports = RoomImage;
