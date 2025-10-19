// controllers/categoryController.js

const categoryService = require('../services/categoryService');

// POST /api/categories - Crear Categoría
exports.createCategory = async (req, res) => {
    try {
        // Usamos req.userId porque auth.js lo inyecta así
        const userId = req.userId; 
        const categoryData = req.body;
        
        const newCategory = await categoryService.createCategory(categoryData, userId);

        res.status(201).json({ 
            success: true, 
            data: newCategory,
        });
    } catch (error) {
        // Por defecto 400 (Bad Request) o 500. Esto sirve para errores de validación de Mongoose o duplicados.
        res.status(400).json({ msg: error.message });
    }
};

// GET /api/categories - Obtener todas las categorías (Público)
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json({
            success: true,
            count: categories.length,
            data: categories,
        });
    } catch (error) {
        // Si falla la DB o el servicio.
        res.status(500).json({ msg: error.message });
    }
};

// PUT /api/categories/:id - Actualizar Categoría
exports.updateCategory = async (req, res) => {
    try {
        const updatedCategory = await categoryService.updateCategory(
            req.params.id,
            req.body
        );
        
        res.status(200).json({
            success: true,
            data: updatedCategory,
        });
    } catch (error) {
        // Si el servicio lanza "Categoría no encontrada" es un 404, si no, 400 por validación.
        const statusCode = error.message === 'Categoría no encontrada' ? 404 : 400;
        res.status(statusCode).json({ msg: error.message });
    }
};

// DELETE /api/categories/:id - Eliminar Categoría
exports.deleteCategory = async (req, res) => {
    try {
        await categoryService.deleteCategory(req.params.id);
        
        res.status(200).json({ 
            success: true, 
            data: {}, 
            message: 'Categoría eliminada correctamente.'
        });
    } catch (error) {
        // Si el servicio lanza "Categoría no encontrada" es un 404, si no, 400.
        const statusCode = error.message === 'Categoría no encontrada' ? 404 : 400;
        res.status(statusCode).json({ msg: error.message });
    }
};