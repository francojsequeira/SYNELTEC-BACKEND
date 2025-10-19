// controllers/productController.js

const productService = require('../services/productService');

// Nota: Los controladores solo llaman al servicio y manejan la respuesta HTTP.

exports.getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts(req.query);
        res.json(products);
    } catch (err) {
        // 500 para errores de DB o inesperados
        res.status(500).json({ msg: err.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        res.json(product);
    } catch (err) {
        // 404 si el servicio lanza 'Producto no encontrado'
        res.status(404).json({ msg: err.message });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const product = await productService.createProduct(req.body);
        res.status(201).json({ msg: 'Producto creado correctamente', product });
    } catch (err) {
        // 500 o 400 si falla la validación (ej. falta el ID de categoría o la clave)
        res.status(500).json({ msg: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await productService.updateProduct(req.params.id, req.body);
        res.json({ msg: 'Producto actualizado', product });
    } catch (err) {
        // 404 si no encuentra el producto
        res.status(404).json({ msg: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        await productService.deleteProduct(req.params.id);
        res.json({ msg: 'Producto eliminado correctamente' });
    } catch (err) {
        // 404 si no encuentra el producto
        res.status(404).json({ msg: err.message });
    }
};