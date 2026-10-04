const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization?.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Not authorized, no token' });
    }

    const token = authorization.slice(7).trim();
    if (!token) return res.status(401).json({ error: 'Not authorized, no token' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        if (!req.user) return res.status(401).json({ error: 'Not authorized, user not found' });
        return next();
    } catch {
        return res.status(401).json({ error: 'Not authorized, token failed' });
    }
};

module.exports = { protect };
