// services/categoryService.js

const Category = require('../models/categoryModel');

// El servicio maneja la interacción con la DB.

// 1. Crear una nueva categoría
exports.createCategory = async (categoryData, userId) => {
    // El user ID viene del controlador (pasa por el JWT)
    const newCategory = new Category({
        ...categoryData,
        user: userId
    });
    
    // Mongoose se encarga de generar el slug antes de guardar
    await newCategory.save();
    return newCategory;
};

// 2. Obtener todas las categorías
exports.getAllCategories = async () => {
    return await Category.find().sort({ name: 1 });
};

// 3. Obtener una categoría por ID
exports.getCategoryById = async (categoryId) => {
    const category = await Category.findById(categoryId);
    
    if (!category) {
        // Si no existe, lanzo un error simple, el controlador define que es 404
        throw new Error('Categoría no encontrada');
    }
    return category;
};

// 4. Actualizar una categoría
exports.updateCategory = async (categoryId, updateData) => {
    // new: true devuelve el doc actualizado. runValidators: true asegura validaciones.
    const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        updateData,
        { new: true, runValidators: true }
    );
    
    if (!updatedCategory) {
        throw new Error('Categoría no encontrada');
    }
    return updatedCategory;
};

// 5. Eliminar una categoría
exports.deleteCategory = async (categoryId) => {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    
    if (!deletedCategory) {
        throw new Error('Categoría no encontrada');
    }
    
    // NOTA: Queda pendiente ver cómo desvincular o archivar los productos asociados.
    
    return { message: 'Categoría eliminada exitosamente.' };
};