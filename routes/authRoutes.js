// routes/authRoutes.js
// Define rutas relacionadas con autenticación y usuarios (registro, login, perfil)

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/profile', auth, userController.getProfile);

module.exports = router;
