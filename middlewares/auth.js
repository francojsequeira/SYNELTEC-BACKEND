// middlewares/auth.js
// Middleware que valida el token JWT en la cabecera Authorization.
// Si el token es válido, agrega datos del usuario a req (ej: userId, role).

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secret_dev';

module.exports = function (req, res, next) {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ msg: 'No se encontró token' });
  }
  const token = authHeader.split(' ')[1]; // “Bearer TOKEN”
  if (!token) {
    return res.status(401).json({ msg: 'Token inválido' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.id;
    req.userRole = payload.role;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token inválido o expirado' });
  }
};
