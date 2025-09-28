// server.js
// Punto de entrada de la aplicación

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

// middlewares globales
app.use(cors());
app.use(express.json());

// conectar base de datos Mongo
connectDB(process.env.MONGODB_URI);

// rutas
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// ruta de prueba / salud
app.get('/', (req, res) => {
  res.json({ msg: 'API Syneltec funcionando' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
