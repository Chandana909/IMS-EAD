// controllers/productController.js
const store = require("../data/store");
const { id, now } = require("../utils/helpers");

function listProducts(req, res) {
  return res.json(store.products);
}

function getProduct(req, res) {
  const p = store.products.find(x => x.id === req.params.id);
  if(!p) return res.status(404).json({ message: "Product not found" });
  return res.json(p);
}

function createProduct(req, res) {
  const { name, category="General", price=0, quantity=0, reorderLevel=0, supplierId=null, description="" } = req.body;
  if(!name) return res.status(400).json({ message: "Name required" });
  const newP = { id: id(), name, category, price: Number(price), quantity: Number(quantity), reorderLevel: Number(reorderLevel), supplierId, description, createdAt: now(), updatedAt: now() };
  store.products.push(newP);
  store.activityLogs.push({ id: id(), user: "system", action: "PRODUCT_CREATED", entityType: "product", entityId: newP.id, details: newP, timestamp: now() });
  return res.status(201).json(newP);
}

function updateProduct(req, res) {
  const p = store.products.find(x => x.id === req.params.id);
  if(!p) return res.status(404).json({ message: "Product not found" });
  const fields = ["name","category","price","quantity","reorderLevel","supplierId","description"];
  fields.forEach(f => { if(req.body[f] !== undefined) p[f] = req.body[f]; });
  p.updatedAt = now();
  store.activityLogs.push({ id: id(), user: "system", action: "PRODUCT_UPDATED", entityType: "product", entityId: p.id, details: req.body, timestamp: now() });
  return res.json(p);
}

function deleteProduct(req, res) {
  const idx = store.products.findIndex(x => x.id === req.params.id);
  if(idx === -1) return res.status(404).json({ message: "Product not found" });
  // prevent deletion if product used in purchases/sales
  const usedInPurchase = store.purchases.some(po => po.items.some(it => it.productId === req.params.id));
  const usedInSale = store.sales.some(s => s.items.some(it => it.productId === req.params.id));
  if(usedInPurchase || usedInSale) return res.status(400).json({ message: "Product linked to transactions. Cannot delete." });
  const [removed] = store.products.splice(idx,1);
  store.activityLogs.push({ id: id(), user: "system", action: "PRODUCT_DELETED", entityType: "product", entityId: removed.id, details: removed, timestamp: now() });
  return res.json({ message: "Deleted", product: removed });
}

module.exports = { listProducts, getProduct, createProduct, updateProduct, deleteProduct };
