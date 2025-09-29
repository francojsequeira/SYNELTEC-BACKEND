// Función para aplicar las reglas de precio sobre un producto

const applyPricingRules = (product, rules) => {
  let finalPrice = product.basePrice; // arranco desde el precio base

  rules.forEach(rule => {
    const now = new Date();

    // me fijo si la regla está dentro del rango de fechas
    if (rule.validFrom && now < rule.validFrom) return;
    if (rule.validTo && now > rule.validTo) return;

    // aplico el descuento según el tipo
    if (rule.discountType === "percentage") {
      finalPrice -= (finalPrice * rule.value) / 100;
    } else if (rule.discountType === "fixed") {
      finalPrice -= rule.value;
    }
  });

  // nunca dejo que el precio quede por debajo del costo
  if (finalPrice < product.cost) {
    finalPrice = product.cost;
  }

  return finalPrice;
};

module.exports = { applyPricingRules };
