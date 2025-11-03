/// server.js
// Punto de entrada de la aplicación

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const pricingRoutes = require("./routes/pricingRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
// Importo mis rutas de gestión de usuario
const userRoutes = require("./routes/userRoutes");

const app = express();

// =========================================================
// CORRECCIÓN CORS: Configuramos explícitamente para permitir la conexión local
// =========================================================
const allowedOrigins = [
  // Origen del frontend de desarrollo (Vite por defecto)
  "http://localhost:5173", // Añadir aquí la URL del frontend cuando esté desplegado en Vercel // 'https://[nombre-de-tu-app-frontend].vercel.app'
];

const corsOptions = {
  // Lógica para verificar si el origen de la petición está permitido
  origin: (origin, callback) => {
    // Permitir peticiones sin origen (ej. Postman) o si el origen está en la lista
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }, // Necesario para que el navegador envíe el header de Autorización (JWT)
  credentials: true, // Asegura que los headers necesarios (Authorization) sean reconocidos en el preflight
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

// middlewares globales
// REEMPLAZAMOS app.use(cors()) por la versión configurada
app.use(cors(corsOptions));
app.use(express.json());
// =========================================================

// conectar base de datos Mongo
connectDB(process.env.MONGODB_URI);

// rutas
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/pricing", pricingRoutes); // acá conecto las rutas de pricing
app.use("/api/categories", categoryRoutes);
// [NUEVO] Conecto mis rutas de CRUD de usuarios en /api/users
app.use("/api/users", userRoutes);

// ruta de prueba / salud
app.get("/", (req, res) => {
  res.json({ msg: "API Syneltec funcionando" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

// Exporto la app para que Vercel la pueda usar
module.exports = app;

/* ********************************************************** */

const User = require("./models/User");
const bcrypt = require("bcryptjs");

app.get("/test-user", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash("123456", 10);
    const newUser = new User({
      name: "Franco",
      email: "franco@test.com",
      password: hashedPassword,
      role: "admin",
    });
    await newUser.save();
    res.json({ msg: "Usuario creado", user: newUser });
  } catch (err) {
    res.status(500).json({ msg: "Error al crear usuario", error: err.message });
  }
});

const Product = require("./models/Product");

app.get("/test-product", async (req, res) => {
  try {
    const newProduct = new Product({
      title: "Mouse Gamer",
      description: "Mouse de alta precisión",
      price: 1500,
      stock: 10,
      category: "Periféricos",
    });
    await newProduct.save();
    res.json({ msg: "Producto creado", product: newProduct });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error al crear producto", error: err.message });
  }
});
