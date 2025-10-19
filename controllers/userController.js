// controllers/userController.js
// Controlador liviano que delega la lógica al service

const userService = require('../services/userService');

exports.registerUser = async (req, res) => {
    try {
        const { user, token } = await userService.registerUser(req.body);
        res.status(201).json({
            msg: 'Usuario registrado correctamente',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { user, token } = await userService.loginUser(req.body);
        res.json({
            msg: 'Login exitoso',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const user = await userService.getUserProfile(req.userId);
        res.json(user);
    } catch (err) {
        res.status(404).json({ msg: err.message });
    }
};
