// controllers/salesController.js
const store = require("../data/store");
const { id, now, findProduct } = require("../utils/helpers");

function listSales(req, res) {
  return res.json(store.sales);
}

function createSale(req, res) {
  const { customerName="", items, date } = req.body;
  if(!items || !items.length) return res.status(400).json({ message: "items required" });
  // check availability
  for(const it of items){
    const prod = findProduct(store, it.productId);
    if(!prod) return res.status(400).json({ message: `Product ${it.productId} not found` });
    if((prod.quantity||0) < Number(it.quantity||0)) return res.status(400).json({ message: `Insufficient stock for ${prod.name}` });
  }
  const total = items.reduce((s,it)=> s + (Number(it.unitPrice||0)*Number(it.quantity||0)), 0);
  const sale = { id: id(), customerName, items, totalAmount: total, date: date||now(), createdBy:"system", createdAt: now() };
  // apply reductions
  for(const it of items){
    const prod = findProduct(store, it.productId);
    prod.quantity = (prod.quantity||0) - Number(it.quantity||0);
    store.stockMovements.push({ id: id(), productId: prod.id, type: "SALE", qty: Number(it.quantity||0), balanceAfter: prod.quantity, refId: sale.id, notes: "", date: now() });
  }
  store.sales.push(sale);
  store.activityLogs.push({ id: id(), user: "system", action: "SALE_CREATED", entityType: "sale", entityId: sale.id, details: sale, timestamp: now() });
  return res.status(201).json(sale);
}

module.exports = { listSales, createSale };
