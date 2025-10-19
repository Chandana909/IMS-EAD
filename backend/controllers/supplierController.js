// controllers/supplierController.js
const store = require("../data/store");
const { id, now } = require("../utils/helpers");

function listSuppliers(req, res) {
  return res.json(store.suppliers);
}

function createSupplier(req, res) {
  const { name, contactPerson="", phone="", email="", address="", notes="" } = req.body;
  if(!name) return res.status(400).json({ message: "Name required" });
  const s = { id: id(), name, contactPerson, phone, email, address, notes, createdAt: now(), updatedAt: now() };
  store.suppliers.push(s);
  store.activityLogs.push({ id: id(), user: "system", action: "SUPPLIER_CREATED", entityType: "supplier", entityId: s.id, details: s, timestamp: now() });
  return res.status(201).json(s);
}

function updateSupplier(req, res) {
  const s = store.suppliers.find(x => x.id === req.params.id);
  if(!s) return res.status(404).json({ message: "Supplier not found" });
  Object.assign(s, req.body);
  s.updatedAt = now();
  store.activityLogs.push({ id: id(), user: "system", action: "SUPPLIER_UPDATED", entityType: "supplier", entityId: s.id, details: req.body, timestamp: now() });
  return res.json(s);
}

function deleteSupplier(req, res) {
  const idx = store.suppliers.findIndex(x => x.id === req.params.id);
  if(idx === -1) return res.status(404).json({ message: "Supplier not found" });
  const linked = store.products.some(p => p.supplierId === req.params.id);
  if(linked) return res.status(400).json({ message: "Supplier linked to products. Unlink first." });
  const [removed] = store.suppliers.splice(idx,1);
  store.activityLogs.push({ id: id(), user: "system", action: "SUPPLIER_DELETED", entityType: "supplier", entityId: removed.id, details: removed, timestamp: now() });
  return res.json({ message: "Deleted", supplier: removed });
}

module.exports = { listSuppliers, createSupplier, updateSupplier, deleteSupplier };
