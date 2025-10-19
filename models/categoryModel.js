// models/categoryModel.js

const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre de la categoría es obligatorio.'],
        trim: true,
        unique: true,
    },
    // El 'slug' es clave para URLs limpias (ej: /categorias/telefonos-moviles)
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true,
    },
    // Asociamos la categoría al usuario (administrador) que la creó.
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    // Para que Mongoose incluya propiedades virtuales si las defino después
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Esto se ejecuta JUSTO antes de guardar la categoría.
CategorySchema.pre('save', function(next) {
    // Si el nombre cambió, genero el slug.
    if (this.isModified('name')) {
        this.slug = this.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    }
    next();
});

module.exports = mongoose.model('Category', CategorySchema);