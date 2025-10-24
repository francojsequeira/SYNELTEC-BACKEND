// controllers/userController.js 

const userService = require('../services/userService');

// --- CONTROLADORES ORIGINALES (Autenticación) ---

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
        // Usamos req.userId inyectado por el middleware 'auth'
        const user = await userService.getUserProfile(req.userId); 
        res.json(user);
    } catch (err) {
        res.status(404).json({ msg: err.message });
    }
};

// --- MIS NUEVOS CONTROLADORES CRUD PARA ADMINISTRACIÓN ---

// GET /api/users - Obtener todos los usuarios (Solo Admin)
exports.getAllUsers = async (req, res) => {
    try {
        // Llamo a mi servicio para obtener todos los usuarios
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        // Manejo el caso 204 (No Content)
        if (err.statusCode === 204) {
            return res.status(204).json([]);
        }
        res.status(500).json({ msg: err.message });
    }
};

// POST /api/users - Crear usuario (Admin)
exports.createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};

// PUT /api/users/:id - Actualizar usuario (Admin)
exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await userService.updateUser(req.params.id, req.body);
        res.status(200).json(updatedUser);
    } catch (err) {
        const statusCode = err.statusCode || 500;
        res.status(statusCode).json({ msg: err.message });
    }
};

// DELETE /api/users/:id - Eliminar usuario (Admin)
exports.deleteUser = async (req, res) => {
    try {
        await userService.deleteUser(req.params.id);
        // Devuelvo 200 con un mensaje de éxito
        res.status(200).json({ msg: 'Usuario eliminado exitosamente' });
    } catch (err) {
        const statusCode = err.statusCode || 500;
        res.status(statusCode).json({ msg: err.message });
    }
};