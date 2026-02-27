const { Room, RoomImage } = require('../models');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

// Get all rooms with optional filters
exports.getAllRooms = async (req, res) => {
    try {
        const { location, gender, type, maxPrice } = req.query;
        let where = {};

        if (location) where.location = location;
        if (gender && gender !== 'Any') where.gender_preference = gender;
        if (type && type !== 'Any') where.type = type; // Updated from room_type
        if (maxPrice) where.price = { [Op.lte]: parseInt(maxPrice) };

        const rooms = await Room.findAll({
            where,
            include: [{ model: RoomImage }]
        });
        res.status(200).json(rooms);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single room by ID
exports.getRoomById = async (req, res) => {
    try {
        const room = await Room.findByPk(req.params.id, {
            include: [{ model: RoomImage }]
        });
        if (!room) return res.status(404).json({ message: 'Room not found' });
        res.status(200).json(room);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new room
exports.createRoom = async (req, res) => {
    try {
        const { title, description, location, price, type, gender_preference, contact } = req.body; // Updated room_type to type
        const user_id = req.user.id;

        const room = await Room.create({
            title,
            description,
            location,
            price,
            type, // Updated
            gender_preference,
            contact,
            user_id
        });

        // Handle image uploads if any
        if (req.files && req.files.length > 0) {
            const images = req.files.map(file => ({
                image_url: file.path,
                room_id: room.id
            }));
            await RoomImage.bulkCreate(images);
        }

        const createdRoom = await Room.findByPk(room.id, {
            include: [{ model: RoomImage }]
        });

        res.status(201).json(createdRoom);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update an existing room
exports.updateRoom = async (req, res) => {
    try {
        const { title, description, location, price, type, gender_preference, contact } = req.body; // Updated room_type to type
        const room = await Room.findByPk(req.params.id);

        if (!room) return res.status(404).json({ message: 'Room not found' });

        // Ensure only the owner can update
        if (room.user_id !== req.user.id) {
            return res.status(403).json({ message: 'User not authorized to update this room' });
        }

        await room.update({
            title,
            description,
            location,
            price,
            type, // Updated
            gender_preference,
            contact
        });

        res.status(200).json(room);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a room
exports.deleteRoom = async (req, res) => {
    try {
        const room = await Room.findByPk(req.params.id);

        if (!room) return res.status(404).json({ message: 'Room not found' });

        // Ensure only the owner can delete
        if (room.user_id !== req.user.id) {
            return res.status(403).json({ message: 'User not authorized to delete this room' });
        }

        // Create a copy of images before destroying the room (if they are needed for file deletion)
        const images = await RoomImage.findAll({ where: { room_id: room.id } });

        await room.destroy();

        // Delete physical files
        for (const image of images) {
            const filePath = path.resolve(image.image_url);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        res.status(200).json({ message: 'Room and associated images deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
