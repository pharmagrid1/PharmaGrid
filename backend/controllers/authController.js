const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

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
        console.error('REGISTER ERROR:', err);
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
          console.error('LOGIN ERROR:', err);
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

exports.getProfile=async(req, res)=>{
    try{
        const result=await User.findById(req.user.id);
        res.json(result);
    } catch(err){
        res.status(500).json({message:'Failed to get profile'});
    }
};


exports.updateProfile = async (req, res) => {
    try {
        const { full_name, password } = req.body;
        const db = require('../config/db');

        if (password) {
            const hash = await bcrypt.hash(password, 10);
            await db.query(
                'UPDATE users SET full_name=$1, password_hash=$2 WHERE id=$3',
                [full_name, hash, req.user.id]
            );
        } else {
            await db.query(
                'UPDATE users SET full_name=$1 WHERE id=$2',
                [full_name, req.user.id]
            );
        }

        const updated = await User.findById(req.user.id);
        res.json({ message: 'Profile updated', user: updated });
    } catch (err) {
        console.error('UPDATE PROFILE ERROR:', err);
        res.status(500).json({ message: 'Failed to update profile', error: err.message });
    }
};