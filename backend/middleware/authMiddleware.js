const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'pharmagrid_secret';

const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('AUTH HEADER:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    console.log('TOKEN:', token);
    console.log('JWT_SECRET:', process.env.JWT_SECRET);

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('DECODED:', decoded);
        req.user = decoded;
        next();
    } catch (err) {
        console.error('JWT ERROR:', err.message);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
const adminOnly = (req,res,next) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required'});
    }
    next ();
};

module.exports = {protect, adminOnly};