// controllers/productController.js
// Controlador liviano que llama a productService

const productService = require('../services/productService');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts(req.query);
        res.json(products);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        res.json(product);
    } catch (err) {
        res.status(404).json({ msg: err.message });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const product = await productService.createProduct(req.body);
        res.status(201).json({ msg: 'Producto creado correctamente', product });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await productService.updateProduct(req.params.id, req.body);
        res.json({ msg: 'Producto actualizado', product });
    } catch (err) {
        res.status(404).json({ msg: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        await productService.deleteProduct(req.params.id);
        res.json({ msg: 'Producto eliminado correctamente' });
    } catch (err) {
        res.status(404).json({ msg: err.message });
    }
};
