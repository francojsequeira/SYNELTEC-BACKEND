// Modelo para guardar reglas de precios personalizadas

const mongoose = require("mongoose");

const pricingRuleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // si la regla aplica a un usuario en particular
    required: false,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company", // pensado a futuro por si agregamos empresas
    required: false,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // si aplica a un producto puntual
    required: false,
  },
  category: {
    type: String, // si aplica a una categoría completa
    required: false,
  },
  discountType: {
    type: String,
    enum: ["percentage", "fixed"], // porcentaje o monto fijo
    required: true,
  },
  value: {
    type: Number, // valor del descuento (ej: 20 = 20% o $20)
    required: true,
  },
  validFrom: {
    type: Date,
    default: Date.now, // fecha desde cuando es válida
  },
  validTo: {
    type: Date, // fecha hasta cuando aplica
    required: false,
  },
}, {
  timestamps: true // guarda createdAt y updatedAt automáticamente
});

module.exports = mongoose.model("PricingRule", pricingRuleSchema);
