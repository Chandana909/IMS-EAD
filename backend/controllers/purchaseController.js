// controllers/purchaseController.js
const store = require("../data/store");
const { id, now, adjustProductQuantity, findProduct } = require("../utils/helpers");

function listPurchases(req, res) {
  return res.json(store.purchases);
}

function createPurchase(req, res) {
  const { supplierId, items, date } = req.body;
  if(!supplierId || !items || !items.length) return res.status(400).json({ message: "supplierId and items required" });
  const total = items.reduce((s,it)=> s + (Number(it.unitCost||0)*Number(it.quantity||0)), 0);
  const purchase = { id: id(), supplierId, items, totalAmount: total, date: date||now(), createdBy: "system", createdAt: now() };
  // atomic-like: apply changes and record stockMovements
  try {
    for(const it of items){
      const prod = findProduct(store, it.productId);
      if(!prod) throw new Error(`Product ${it.productId} not found`);
      prod.quantity = (prod.quantity||0) + Number(it.quantity||0);
      store.stockMovements.push({ id: id(), productId: prod.id, type: "PURCHASE", qty: Number(it.quantity||0), balanceAfter: prod.quantity, refId: purchase.id, notes: "", date: now() });
    }
    store.purchases.push(purchase);
    store.activityLogs.push({ id: id(), user:"system", action: "PURCHASE_CREATED", entityType: "purchase", entityId: purchase.id, details: purchase, timestamp: now() });
    return res.status(201).json(purchase);
  } catch(err) {
    return res.status(400).json({ message: err.message });
  }
}

module.exports = { listPurchases, createPurchase };
