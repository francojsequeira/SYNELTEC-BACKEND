// services/userService.js

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Obtener el secreto del entorno (como ya está en tu código)
const JWT_SECRET = process.env.JWT_SECRET || 'secret_dev';

// Registrar un nuevo usuario
exports.registerUser = async ({ name, email, password, role }) => {
    // 1. Verifico si el usuario ya existe (Lógica de Negocio)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        // NOTA: Usamos Error aquí, el controlador definirá el 400
        throw new Error('El usuario ya existe'); 
    }

    // 2. Hash de la contraseña (Lógica de Seguridad)
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // 3. Crear y guardar el usuario
    const user = new User({
        name,
        email,
        password: hashedPassword,
        role: role || 'user'
    });

    await user.save();

    // 4. Generar el Token (Lógica de Seguridad)
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    // Devolvemos el usuario y el token
    return { user, token };
};

// Login de usuario
exports.loginUser = async ({ email, password }) => {
    // 1. Buscar usuario
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Credenciales inválidas');
    }

    // 2. Comparar contraseña (Lógica de Seguridad)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Credenciales inválidas');
    }

    // 3. Generar Token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    return { user, token };
};

// Obtener perfil de usuario autenticado
exports.getUserProfile = async (userId) => {
    // Buscamos por ID y quitamos la contraseña del resultado
    const user = await User.findById(userId).select('-password');
    if (!user) {
        // NOTA: Lanzamos el error, el controlador define el 404
        throw new Error('Usuario no encontrado');
    }
    return user;
};