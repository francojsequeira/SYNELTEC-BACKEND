// controllers/userController.js
// Mis funciones para manejar registro, login y perfil.

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // ¡Ojo! Necesito bcrypt para encriptar/comparar contraseñas.

const JWT_SECRET = process.env.JWT_SECRET || 'secret_dev';

/**
 * Registrar un nuevo usuario
 */
exports.registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Primero verifico si ya existe el email
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }
        
        // NOTA IMPORTANTE: Siempre debo hashear la contraseña antes de guardarla.
        // Uso bcrypt.hash. El '10' es el salt rounds (cuánto más alto, más seguro, pero más lento).
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear nuevo usuario
        user = new User({
            name,
            email,
            password: hashedPassword, // Guardo la versión segura (hasheada)
            role: role || 'user',     // Asigno rol 'user' por defecto si no se especifica
        });

        await user.save();

        // Generar token JWT para la sesión inmediata
        const token = jwt.sign(
            { id: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

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
        console.error(err);
        res.status(500).json({ msg: 'Error en el servidor durante el registro' });
    }
};

/**
 * Login de usuario
 */
exports.loginUser = async (req, res) => {
    const { email, password } = req.body; // La 'password' que llega aquí es la clave plana de Postman

    try {
        // Buscar usuario por email
        const user = await User.findOne({ email });
        // Si no existe, no doy pista si falló el email o la clave (seguridad)
        if (!user) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        // ¡ESTO ES LO QUE FALTABA!
        // Uso bcrypt.compare para comparar la clave plana (password) con la clave hasheada (user.password)
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            // Si no coincide, vuelvo a dar un error genérico por seguridad
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }
        
        // Si llegué hasta aquí, ¡el login es exitoso!
        
        // Generar token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

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
        console.error(err);
        res.status(500).json({ msg: 'Error en el servidor durante el login' });
    }
};

/**
 * Obtener perfil del usuario autenticado
 */
exports.getProfile = async (req, res) => {
    try {
        // Recordatorio: req.userId lo setea el middleware auth.js
        // Uso .select('-password') para que nunca se envíe la contraseña hasheada al cliente
        const user = await User.findById(req.userId).select('-password');
        
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};