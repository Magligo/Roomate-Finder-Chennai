const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', roomController.getAllRooms);
router.get('/:id', roomController.getRoomById);

router.post('/', authMiddleware, upload.array('images', 5), roomController.createRoom);
router.put('/:id', authMiddleware, roomController.updateRoom);
router.delete('/:id', authMiddleware, roomController.deleteRoom);

module.exports = router;
