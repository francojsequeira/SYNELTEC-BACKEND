// controllers/productController.js
// Funciones para CRUD de productos (Lógica de base de datos)

const Product = require('../models/Product');

/**
 * Obtener todos los productos (Público)
 */
exports.getAllProducts = async (req, res) => {
    try {
        const filters = { ...req.query }; 
        const products = await Product.find(filters);
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error al obtener los productos' });
    }
};

/**
 * Obtener un producto por ID (Público)
 */
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Producto no encontrado' });
        }
        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error al obtener el producto' });
    }
};

/**
 * Crear un nuevo producto (Protegido por Admin)
 */
exports.createProduct = async (req, res) => {
    // NOTA DE APRENDIZAJE: La validación de que solo un admin puede hacer esto
    // ya la hizo 'auth' e 'isAdmin' en las rutas.
    try {
        // Aquí ajusté los campos a title, description, price, stock, category
        const { title, description, price, stock, category } = req.body; 

        const product = new Product({
            title, 
            description,
            price,
            stock,
            category
        });

        await product.save();
        res.status(201).json({ msg: 'Producto creado correctamente', product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error al crear el producto' });
    }
};

/**
 * Actualizar un producto existente (Protegido por Admin)
 */
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const product = await Product.findByIdAndUpdate(id, updates, { new: true }); 
        if (!product) {
            return res.status(404).json({ msg: 'Producto no encontrado' });
        }

        res.json({ msg: 'Producto actualizado', product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error al actualizar el producto' });
    }
};

/**
 * Eliminar un producto (Protegido por Admin)
 */
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ msg: 'Producto no encontrado' });
        }

        res.json({ msg: 'Producto eliminado correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error al eliminar el producto' });
    }
};