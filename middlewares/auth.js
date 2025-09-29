// middlewares/auth.js
// Middleware que valida el token JWT en la cabecera Authorization.
// Si el token es válido, agrega datos del usuario (userId y userRole) a req.

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secret_dev';

module.exports = function (req, res, next) {
    const authHeader = req.header('Authorization');
    
    // 1. Chequear si el header de autorización existe
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'Acceso denegado. Se requiere formato "Bearer <token>".' });
    }
    
    // Extraer el token después de 'Bearer '
    const token = authHeader.split(' ')[1]; 
    
    // Si el split resultó en algo vacío (ej: solo 'Bearer')
    if (!token) {
        return res.status(401).json({ msg: 'Token inválido o ausente.' });
    }

    try {
        // Verificar el token con el secreto
        const payload = jwt.verify(token, JWT_SECRET);
        
        // ¡Almacenamos los datos para usarlos en otros middlewares/controladores!
        req.userId = payload.id;
        req.userRole = payload.role; // <-- Uso esta variable para el middleware isAdmin
        
        next();
    } catch (err) {
        // Esto captura errores de verificación (expiración, firma inválida)
        return res.status(401).json({ msg: 'Token no válido o expirado.' });
    }
};