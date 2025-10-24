// services/userService.js

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Obtener el secreto del entorno 
const JWT_SECRET = process.env.JWT_SECRET || 'secret_dev';

// --- FUNCIONES ORIGINALES (Autenticación) ---

// Registrar un nuevo usuario
exports.registerUser = async ({ name, email, password, role }) => {
    // Primero, chequeo si el email ya está en uso.
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('El usuario ya existe');    
    }

    // Hago el hash de la contraseña antes de guardar.
    const hashedPassword = await bcrypt.hash(password, 10);
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
    // Busco por ID y quito la contraseña por seguridad
    const user = await User.findById(userId).select('-password');
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    return user;
};


// --- MIS NUEVAS FUNCIONES CRUD PARA ADMINISTRACIÓN ---

// Función para obtener todos los usuarios (sin contraseña)
exports.getAllUsers = async () => {
    // Solo permito el acceso si se excluye la contraseña por seguridad.
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    
    // Si no encuentro usuarios, lanzo un error 204 (No Content)
    if (users.length === 0) {
        const error = new Error("There are no users");
        error.statusCode = 204;
        throw error;
    }
    return users;
};

// Crear un nuevo usuario (Usado por Admin)
exports.createUser = async ({ name, email, password, role = 'user' }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    // Devuelvo el objeto sin la contraseña
    const userObject = newUser.toObject();
    delete userObject.password;
    return userObject; 
};

// Actualizar un usuario por ID
exports.updateUser = async (userId, updateData) => {
    const { password, ...rest } = updateData;
    const updates = { ...rest };

    // Si recibo una nueva contraseña, la hasheo antes de actualizar
    if (password) {
        updates.password = await bcrypt.hash(password, 10);
    }
    
    // Uso findByIdAndUpdate para obtener el objeto actualizado y me aseguro de excluir la contraseña
    const updatedUser = await User.findByIdAndUpdate(userId, updates, { 
        new: true, 
        runValidators: true 
    }).select('-password'); 

    if (!updatedUser) {
        const error = new Error('Usuario no encontrado');
        error.statusCode = 404; 
        throw error;
    }
    return updatedUser;
};

// Función para eliminar un usuario por ID
exports.deleteUser = async (userId) => {
    const deletedUser = await User.findByIdAndDelete(userId);
    
    if (!deletedUser) {
        const error = new Error('Usuario no encontrado');
        error.statusCode = 404; 
        throw error;
    }
    return { message: 'User deleted successfully' };
};