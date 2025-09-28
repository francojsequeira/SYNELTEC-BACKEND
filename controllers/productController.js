// controllers/productController.js
// Aquí funciones para CRUD de productos

const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  // lógica: buscar todos o con filtros, devolver lista
};

exports.getProductById = async (req, res) => {
  // lógica: buscar por id, si no existe devolver 404
};

exports.createProduct = async (req, res) => {
  // lógica: crear producto nuevo (solo admin)
};

exports.updateProduct = async (req, res) => {
  // lógica: actualizar producto existente
};

exports.deleteProduct = async (req, res) => {
  // lógica: eliminar producto por id
};
