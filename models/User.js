// models/User.js
// Define el esquema de Usuario: campos, tipos, validaciones mínimas.
// Se usa con mongoose.model para crear la colección en MongoDB.

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, {
  timestamps: true // crea createdAt y updatedAt
});

module.exports = mongoose.model('User', userSchema);
