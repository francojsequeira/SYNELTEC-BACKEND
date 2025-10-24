// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth'); // Mi middleware de JWT
const isAdmin = require('../middlewares/isAdmin'); // Mi middleware de rol

// Aplico mis middlewares de seguridad a todas las rutas de gestión de usuarios
router.route('/')
    .get(auth, isAdmin, userController.getAllUsers)   // GET /api/users
    .post(auth, isAdmin, userController.createUser);  // POST /api/users

router.route('/:id')
    .put(auth, isAdmin, userController.updateUser)    // PUT /api/users/:id
    .delete(auth, isAdmin, userController.deleteUser); // DELETE /api/users/:id

module.exports = router;