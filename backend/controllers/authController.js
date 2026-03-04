const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
constUser = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'pharmagrid_secret';

exports.register = async (req,res) => {
    try {
        const {full_name, email, password} = req.body;

        const existing = await User.findByEmail(email);
        if(existing) {
            return res.status(400).json({ message: 'Email already in use'});
        }
    
    const password_hash = await bcrypt.hash(password, 10);
    const user = await User.create ({ full_name, email, password_hash});

    const token = jwt.sign(
        { id:user.id, email: user.email, role: user.role},
        JWT_SECRET,
        { expiresIn: '7d'}
    );
    res.status(201).json({user, token});
    } catch(err) {
        res.status(500).json({ message: 'Registration failed', error: err.message});
    }
};

exports.login = async (req,res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findByEmail(email);

        if (!user) {
            return res.status(401).json({message: 'Invalid email or password'});
        }
       
        const valid = await bcrypt.compare(password, user.password_hash);
        if(!valid) {
            return res.status(401).json({ message: 'Invalid email or password'});
        }

        const token = jwt.sign (
            { id: user.id, email: user.email, role: user.role},
            JWT_SECRET,
            { expiresIn: '7d'}
        );

        res.json({
            user: {id:user.id, full_name: user.full_name, email: user.email, role: user.role},
            token
        });
    } catch (err) {
        res.status(500).json({ message: 'Login failed', error: err.message });

    }
};

exports.getMe = async(req,res) => {
    try{
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (err) {
        res.status(500).json({message: 'Failed to get user '});
    } 
};