// services/userService.js

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Obtener el secreto del entorno 
const JWT_SECRET = process.env.JWT_SECRET || 'secret_dev';

// Registrar un nuevo usuario
exports.registerUser = async ({ name, email, password, role }) => {
    // Primero, chequear si el email ya está en uso. Lógica de negocio pura.
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        // Lanzo error 400. El controlador lo atrapará.
        throw new Error('El usuario ya existe'); 
    }

    // Hago el hash de la contraseña antes de guardar.
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Creo y guardo el usuario
    const user = new User({
        name,
        email,
        password: hashedPassword,
        role: role || 'user'
    });

    await user.save();

    // Genero el Token JWT.
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    return { user, token };
};

// Login de usuario
exports.loginUser = async ({ email, password }) => {
    // Busco usuario
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Credenciales inválidas');
    }

    // Comparo contraseñas
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Credenciales inválidas');
    }

    // Genero el Token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    return { user, token };
};

// Obtener perfil de usuario autenticado
exports.getUserProfile = async (userId) => {
    // Buscamos por ID y quitamos la contraseña por seguridad
    const user = await User.findById(userId).select('-password');
    if (!user) {
        // Lanzo error 404.
        throw new Error('Usuario no encontrado');
    }
    return user;
};