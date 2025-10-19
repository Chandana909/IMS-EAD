// data/store.js
// Central in-memory storage. When switching to MongoDB, replace usages with Mongoose models.
module.exports = {
  products: [],         // { id, name, category, price, quantity, reorderLevel, supplierId, description }
  suppliers: [],        // { id, name, contactPerson, phone, email, address }
  purchases: [],        // { id, supplierId, items: [{productId, quantity, unitCost}], totalAmount, date, createdBy }
  sales: [],            // { id, customerName, items: [{productId, quantity, unitPrice}], totalAmount, date, createdBy }
  stockMovements: [],   // { id, productId, type, qty, balanceAfter, refId, notes, date }
  activityLogs: [],     // { id, user, action, entityType, entityId, details, timestamp }
  settings: {           // single settings object
    currency: "INR",
    defaultReorderDays: 7,
    enableForecasting: false,
    companyName: "My Company"
  }
};
