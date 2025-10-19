// controllers/userController.js (MODIFICAR)

const userService = require('../services/userService');

// NOTA: Mantengo el manejo de errores 'try...catch' tradicional.

exports.registerUser = async (req, res) => {
    try {
        // Delega la lógica al servicio
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
        // El servicio lanza errores claros, respondemos con 400
        res.status(400).json({ msg: err.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        // Delega la lógica al servicio
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
        // El servicio lanza "Credenciales inválidas", respondemos con 400
        res.status(400).json({ msg: err.message });
    }
};

exports.getProfile = async (req, res) => {
    try {
        // Usamos req.userId inyectado por el middleware 'auth'
        const user = await userService.getUserProfile(req.userId); 
        res.json(user);
    } catch (err) {
        // El servicio lanza "Usuario no encontrado", respondemos con 404
        res.status(404).json({ msg: err.message });
    }
};