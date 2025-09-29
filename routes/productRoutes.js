// routes/productRoutes.js
// Define rutas para productos (listar, detalle, crear, editar, borrar)
// routes/productRoutes.js
// Rutas para CRUD de productos

const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');

// Obtener todos los productos (público o autenticado)
router.get('/', productController.getAllProducts);

// Obtener producto por ID (público o autenticado)
router.get('/:id', productController.getProductById);

// Crear producto (solo admin)
router.post('/', auth, isAdmin, productController.createProduct);

// Actualizar producto (solo admin)
router.put('/:id', auth, isAdmin, productController.updateProduct);

// Eliminar producto (solo admin)
router.delete('/:id', auth, isAdmin, productController.deleteProduct);

module.exports = router;
