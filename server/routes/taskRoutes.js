const express = require('express');
const { getAllTasks, getOneCase } = require('../controllers/taskController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

// Route cần bảo vệ
router.get('/', protect, getAllTasks);
router.get('/:id', protect, getOneCase);

module.exports = router;