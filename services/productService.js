// services/productService.js
// Lógica de negocio de productos

const Product = require('../models/Product');

//  Obtener todos los productos
exports.getAllProducts = async (filters) => {
    return await Product.find(filters).populate('category'); // populamos categoría
};

//  Obtener producto por ID
exports.getProductById = async (id) => {
    const product = await Product.findById(id).populate('category');
    if (!product) throw new Error('Producto no encontrado');
    return product;
};

// Crear producto
exports.createProduct = async (data) => {
    const product = new Product(data);
    await product.save();
    return product;
};

//  Actualizar producto
exports.updateProduct = async (id, updates) => {
    const product = await Product.findByIdAndUpdate(id, updates, { new: true });
    if (!product) throw new Error('Producto no encontrado');
    return product;
};

//  Eliminar producto
exports.deleteProduct = async (id) => {
    const product = await Product.findByIdAndDelete(id);
    if (!product) throw new Error('Producto no encontrado');
    return product;
};
