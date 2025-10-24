/// server.js
// Punto de entrada de la aplicación

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');


const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const pricingRoutes = require("./routes/pricingRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
// [NUEVO] Importo mis rutas de gestión de usuario
const userRoutes = require('./routes/userRoutes'); 

const app = express();

// middlewares globales
app.use(cors());
app.use(express.json());

// conectar base de datos Mongo
connectDB(process.env.MONGODB_URI);

// rutas
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use("/api/pricing", pricingRoutes); // acá conecto las rutas de pricing
app.use("/api/categories", categoryRoutes);
// [NUEVO] Conecto mis rutas de CRUD de usuarios en /api/users
app.use('/api/users', userRoutes); 

// ruta de prueba / salud
app.get('/', (req, res) => {
    res.json({ msg: 'API Syneltec funcionando' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

// Exporto la app para que Vercel la pueda usar
module.exports = app;

/* ********************************************************** */

const User = require('./models/User'); 
const bcrypt = require('bcryptjs');

app.get('/test-user', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash('123456', 10);
        const newUser = new User({
            name: 'Franco',
            email: 'franco@test.com',
            password: hashedPassword,
            role: 'admin'
        });
        await newUser.save();
        res.json({ msg: 'Usuario creado', user: newUser });
    } catch (err) {
        res.status(500).json({ msg: 'Error al crear usuario', error: err.message });
    }
});



const Product = require('./models/Product');

app.get('/test-product', async (req, res) => {
    try {
        const newProduct = new Product({
            title: 'Mouse Gamer',
            description: 'Mouse de alta precisión',
            price: 1500,
            stock: 10,
            category: 'Periféricos'
        });
        await newProduct.save();
        res.json({ msg: 'Producto creado', product: newProduct });
    } catch (err) {
        res.status(500).json({ msg: 'Error al crear producto', error: err.message });
    }
});