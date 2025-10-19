// services/productService.js 
const Product = require('../models/Product');

// Obtener todos los productos (aplica populate)
exports.getAllProducts = async (filters) => {
    // Le decimos a Mongoose que nos traiga todo el objeto de categoría, no solo el ID
    return await Product.find(filters).populate('category'); 
};

// Obtener producto por ID (aplica populate)
exports.getProductById = async (id) => {
    const product = await Product.findById(id).populate('category');
    if (!product) throw new Error('Producto no encontrado');
    return product;
};

// Crear producto
exports.createProduct = async (data) => {
    // Mongoose se encarga de que el ID de categoría sea válido
    const product = new Product(data);
    await product.save();
    return product;
};

// Actualizar producto (aplica populate en el resultado)
exports.updateProduct = async (id, updates) => {
    // new: true para devolver el actualizado. Y luego populate.
    const product = await Product.findByIdAndUpdate(id, updates, { new: true }).populate('category');
    if (!product) throw new Error('Producto no encontrado');
    return product;
};

// Eliminar producto
exports.deleteProduct = async (id) => {
    const product = await Product.findByIdAndDelete(id);
    if (!product) throw new Error('Producto no encontrado');
    return product;
};