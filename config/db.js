// Necesito Mongoose para interactuar con MongoDB de manera más sencilla
const mongoose = require('mongoose');

// Esta es la función principal que intentará conectar
const connectDB = async () => {
    try {
        // Uso mongoose.connect y le paso la variable de entorno MONGODB_URI (la que está en mi .env)
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            // Pongo estas opciones para evitar warnings de Mongoose en la consola
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Si la conexión es exitosa, muestro un mensaje en la consola indicando a dónde me conecté
        console.log(`¡Conectado! MongoDB Host: ${conn.connection.host}`);

    } catch (err) {
        // Si hay un error, lo muestro en la consola
        console.error(`¡Error de Conexión a MongoDB! Detalle: ${err.message}`);
        
        // Y lo más importante: salgo del proceso de Node con un código de error (1)
        // Esto detiene el servidor si no hay base de datos, porque no tiene sentido seguir
        process.exit(1); 
    }
};

// Exporto mi función para poder llamarla desde server.js
module.exports = connectDB;