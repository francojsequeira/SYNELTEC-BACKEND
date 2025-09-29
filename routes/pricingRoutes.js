// Rutas para manejar las reglas de precio y calcular precios finales

const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const PricingRule = require("../models/PricingRule");
const applyPricingRules = require("../Utils/pricing");

// Crear una nueva regla de precios
// POST /api/pricing
router.post("/", async (req, res) => {
  try {
    const newRule = new PricingRule(req.body); // creo la regla con los datos enviados
    await newRule.save(); // la guardo en la DB
    res.status(201).json(newRule); // devuelvo la regla creada
  } catch (error) {
    res.status(500).json({ msg: "Error al crear la regla", error: error.message });
  }
});

// Calcular el precio final de un producto para un usuario
// GET /api/pricing/:productId/:userId
router.get("/:productId/:userId", async (req, res) => {
  try {
    const { productId, userId } = req.params;

    // busco el producto
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }

    // busco las reglas que apliquen a este caso
    const rules = await PricingRule.find({
      $or: [
        { user: userId },
        { product: productId },
        { category: product.category }
      ]
    });

    // calculo el precio final aplicando las reglas
    const finalPrice = applyPricingRules(product, rules);

    res.json({
      product: product.name,
      basePrice: product.basePrice,
      finalPrice,
      rulesApplied: rules.length
    });
  } catch (error) {
    res.status(500).json({ msg: "Error al calcular precio", error: error.message });
  }
});

module.exports = router;
