const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Room = sequelize.define('Room', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    type: { // Changed from room_type to type
        type: DataTypes.ENUM('Private', 'Shared'),
        allowNull: false
    },
    gender_preference: {
        type: DataTypes.ENUM('Male', 'Female', 'Any'),
        allowNull: false
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true,
    underscored: true
});

module.exports = Room;
