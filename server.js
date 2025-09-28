// 1. Importaciones esenciales para mi servidor

// Express es el framework que usaré para crear el servidor
const express = require('express'); 
// dotenv me ayuda a cargar las variables de entorno (como MONGODB_URI) desde el archivo .env
const dotenv = require('dotenv');
// Traigo mi función de conexión a la base de datos
const connectDB = require('./config/db'); 
// CORS (Cross-Origin Resource Sharing) es fundamental para permitir que mi frontend (React) se comunique con este backend
const cors = require('cors'); 

// 2. Configuración inicial

// ¡MUY IMPORTANTE! Cargo las variables de mi archivo .env para usarlas en mi código
dotenv.config();

// Inicializo la conexión a mi base de datos MongoDB (la función que creé en config/db.js)
connectDB();

// Creo una instancia de mi aplicación Express
const app = express();

// 3. Middlewares (Capas que procesan las peticiones)

// Uso CORS para permitir peticiones desde cualquier origen (por ahora)
app.use(cors()); 
// Middleware para que Express pueda entender y parsear el cuerpo de las peticiones que vienen en formato JSON (ej: un login)
app.use(express.json()); 

// 4. Mis Rutas (Aquí defino los endpoints de mi API)

// Ruta de prueba inicial (GET a la raíz '/') para saber si el servidor está vivo
app.get('/', (req, res) => {
    // Envío una respuesta sencilla al navegador
    res.send('¡Mi API de Syneltec está funcionando perfectamente!');
});

// ********** ESPACIO PARA MIS RUTAS REALES ********** 
// Más adelante, aquí importaré y usaré mis rutas de usuarios, productos, y órdenes.
// Ejemplo: app.use('/api/products', require('./routes/productRoutes'));


// 5. Encender el Servidor

// Defino el puerto. Uso el que especifiqué en mi .env (3001) o el 5000 por defecto
const PORT = process.env.PORT || 5000; 

// Pongo mi aplicación a escuchar peticiones en el puerto definido
app.listen(PORT, () => {
    // Muestro un mensaje en consola para saber que el servidor está listo
    console.log(`Servidor de Syneltec corriendo en el puerto ${PORT}`);
});