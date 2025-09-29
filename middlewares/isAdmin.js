// middlewares/isAdmin.js
// Middleware que permite acceso solo si el usuario tiene rol “admin”.
// Se debe ejecutar después de auth.js.

module.exports = function (req, res, next) {
    
    // Verificamos si req.userRole existe y si el valor es 'admin'
    // El rol 'admin' debe coincidir con el valor que usas en la DB.
    if (req.userRole === 'admin') {
        next(); // Es admin, permitir el paso
    } else {
        // No tiene el rol requerido
        return res.status(403).json({ msg: 'Acceso denegado. Se requiere rol de administrador.' });
    }
};