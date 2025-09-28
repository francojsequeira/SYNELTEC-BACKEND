// controllers/userController.js
// Aquí pondremos las funciones que manejarán registro, login, perfil.

const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  // lógica para crear usuario: recibir datos, validar, hashear contraseña, guardar, devolver token + usuario
};

exports.loginUser = async (req, res) => {
  // lógica para login: recibir email/password, comparar, generar token y devolver
};

exports.getProfile = async (req, res) => {
  // lógica para devolver datos del usuario autenticado (sin mostrar password)
};
