// middlewares/isAdmin.js
// Middleware que permite acceso solo si el usuario tiene rol “admin”.
// Se debe ejecutar después de auth.js.

module.exports = function (req, res, next) {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ msg: 'Acceso denegado. Solo admin permite.' });
  }
  next();
};
