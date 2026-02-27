const sequelize = require('../config/database');
const User = require('./User');
const Room = require('./Room');
const RoomImage = require('./RoomImage');

// Associations setup
User.hasMany(Room, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Room.belongsTo(User, { foreignKey: 'user_id' });

Room.hasMany(RoomImage, { foreignKey: 'room_id', onDelete: 'CASCADE' });
RoomImage.belongsTo(Room, { foreignKey: 'room_id' });

module.exports = {
    sequelize,
    User,
    Room,
    RoomImage
};
