// config/db.js
// Este archivo es responsable de conectar con la base de datos MongoDB
// usando mongoose. Se importa desde server.js al iniciar la app.

const mongoose = require('mongoose');

const connectDB = async (mongoURI) => {
  try {
    await mongoose.connect(mongoURI, {  
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB conectado ✅');
  } catch (err) {
    console.error('Error al conectar MongoDB:', err);
    process.exit(1); // si no puede conectar, detener la app
  }
};

module.exports = connectDB;
