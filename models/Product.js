// models/Product.js
// Define el esquema de Producto: título, descripción, precio, stock, imágenes, etc.

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    // Esto era un String antes, lo cambio a referencia real para el populate.
    category: { 
        type: mongoose.Schema.ObjectId, 
        ref: 'Category', // Nombre del modelo de Categoría
        required: true 
    }, 
    images: [String]
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);