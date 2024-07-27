const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.json({
                success: false,
                message: 'User already exists',
                data: null
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            email,
            password: hashedPassword
        });

        const createdUser = await user.save();
        const token = jwt.sign({ id: createdUser._id }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                token,
                user: {
                    id: createdUser._id,
                    email: createdUser.email
                }
            }
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Server error' });

    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '30d'
            });

            res.json({
                success: true,
                message: 'User logged in successfully',
                data: {
                    token,
                    user: {
                        id: user._id,
                        email: user.email
                    }
                }
            });
        } else {
            res.json({
                success: false,
                message: 'Invalid email or password',
                data: null
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

const checkUser = async (req, res) => {
    // Check req.user
    res.json({
        success: true,
        message: 'User is logged in',
        data: req.user
    });
}

module.exports = {
    registerUser,
    loginUser,
    checkUser
};