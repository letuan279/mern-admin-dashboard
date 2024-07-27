const express = require('express');
const { registerUser, loginUser, checkUser } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Route cần bảo vệ
router.get('/check-auth', protect, checkUser);

module.exports = router;