// utils/helpers.js
const { v4: uuidv4 } = require("uuid");

function id() { return uuidv4(); }

function now() { return new Date().toISOString(); }

function findProduct(store, productId) {
  return store.products.find(p => p.id === productId);
}

function adjustProductQuantity(store, productId, delta) {
  const p = findProduct(store, productId);
  if(!p) throw new Error("Product not found");
  const newQty = (p.quantity || 0) + delta;
  if(newQty < 0) throw new Error("Insufficient stock");
  p.quantity = newQty;
  return p.quantity;
}

module.exports = { id, now, findProduct, adjustProductQuantity };
