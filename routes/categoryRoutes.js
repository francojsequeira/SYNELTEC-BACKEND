// routes/categoryRoutes.js

const express = require('express');
const {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} = require('../controllers/categoryController');

// Importo los middlewares de seguridad. auth.js exporta la función por defecto.
const protect = require('../middlewares/auth'); 
const isAdmin = require('../middlewares/isAdmin'); 

const router = express.Router();

// --- Rutas Públicas ---
// Cualquiera puede ver las categorías.
router.route('/')
    .get(getAllCategories);

// --- Rutas Protegidas (Solo Administradores) ---
router.route('/')
    // Necesito protect para identificar al usuario y isAdmin para permitir la creación.
    .post(protect, isAdmin, createCategory);

router.route('/:id')
    .put(protect, isAdmin, updateCategory) 
    .delete(protect, isAdmin, deleteCategory); 

module.exports = router;