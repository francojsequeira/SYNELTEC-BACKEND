// services/userService.js
// Lógica de negocio relacionada con usuarios

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret_dev';

//  Registrar un nuevo usuario
exports.registerUser = async ({ name, email, password, role }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('El usuario ya existe');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        name,
        email,
        password: hashedPassword,
        role: role || 'user'
    });

    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    return { user, token };
};

//  Login de usuario
exports.loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Credenciales inválidas');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Credenciales inválidas');

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    return { user, token };
};

//  Obtener perfil de usuario autenticado
exports.getUserProfile = async (userId) => {
    const user = await User.findById(userId).select('-password');
    if (!user) throw new Error('Usuario no encontrado');
    return user;
};
