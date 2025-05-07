const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (userData) => {
    const { name, email, password, phone, role } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new Error('Email already in use');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        phone,
        role
    });

    return newUser;
};

const login = async (email, password) => {
    // Find user by email
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword)
    
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new Error('User not found');
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });

    return { user, token };
};

module.exports = { signup, login };