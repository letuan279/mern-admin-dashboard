const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Route cần bảo vệ
router.get('/check-auth', protect, (req, res) => {
    res.json(req.user);
});

module.exports = router;