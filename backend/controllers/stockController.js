// controllers/stockController.js
const store = require("../data/store");
const { id, now, findProduct } = require("../utils/helpers");

function listStockMovements(req, res) {
  return res.json(store.stockMovements);
}

function adjustStock(req, res) {
  const { productId, quantityChange, notes } = req.body;
  const prod = findProduct(store, productId);
  if(!prod) return res.status(404).json({ message: "Product not found" });
  const newQty = (prod.quantity||0) + Number(quantityChange||0);
  if(newQty < 0) return res.status(400).json({ message: "Resulting quantity cannot be negative" });
  prod.quantity = newQty;
  const mv = { id: id(), productId, type: "ADJUSTMENT", qty: Number(quantityChange||0), balanceAfter: prod.quantity, refId: null, notes: notes||"", date: now() };
  store.stockMovements.push(mv);
  store.activityLogs.push({ id: id(), user: "system", action: "STOCK_ADJUSTED", entityType: "product", entityId: prod.id, details: mv, timestamp: now() });
  return res.json({ product: prod, movement: mv });
}

module.exports = { listStockMovements, adjustStock };
