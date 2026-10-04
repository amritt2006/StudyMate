const jwt = require('jsonwebtoken');
const User = require('../models/User');

const MAX_AVATAR_BYTES = 2 * 1024 * 1024;
const AVATAR_DATA_URL_PATTERN = /^data:image\/(?:png|jpeg|webp);base64,([A-Za-z0-9+/]+={0,2})$/;

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const user = await User.create({ name, email, password });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            bio: user.bio,
            avatar: user.avatar,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            bio: user.bio,
            avatar: user.avatar,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (req.body.name !== undefined) {
            if (typeof req.body.name !== 'string' || !req.body.name.trim()) {
                return res.status(400).json({ error: 'Name cannot be empty' });
            }
            if (req.body.name.trim().length > 80) {
                return res.status(400).json({ error: 'Name must be 80 characters or fewer' });
            }
            user.name = req.body.name.trim();
        }

        if (req.body.bio !== undefined) {
            if (typeof req.body.bio !== 'string' || req.body.bio.length > 500) {
                return res.status(400).json({ error: 'Bio must be 500 characters or fewer' });
            }
            user.bio = req.body.bio.trim();
        }

        if (req.body.avatar !== undefined) {
            if (req.body.avatar === '') {
                user.avatar = '';
            } else {
                const match = typeof req.body.avatar === 'string' && req.body.avatar.match(AVATAR_DATA_URL_PATTERN);
                if (!match) {
                    return res.status(400).json({ error: 'Avatar must be a PNG, JPEG, or WebP image' });
                }
                const imageBytes = Buffer.from(match[1], 'base64').length;
                if (imageBytes > MAX_AVATAR_BYTES) {
                    return res.status(400).json({ error: 'Avatar image must be 2 MB or smaller' });
                }
                user.avatar = req.body.avatar;
            }
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            bio: updatedUser.bio,
            avatar: updatedUser.avatar,
            createdAt: updatedUser.createdAt
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: 'Please provide current and new password' });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ error: 'New password must be at least 6 characters' });
        }

        const user = await User.findById(req.user.id).select('+password');
        if (!user || !(await user.matchPassword(currentPassword))) {
            return res.status(401).json({ error: 'Invalid current password' });
        }

        user.password = newPassword;
        await user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
