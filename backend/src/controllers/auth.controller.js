const authService = require('../services/auth.service');

const signup = async (req, res) => {
    try {
        const newUser = await authService.signup(req.body);
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await authService.login(email, password);
        res.status(200).json({ message: 'Login successful', user, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { signup, login };