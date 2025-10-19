// controllers/dashboardController.js
const store = require("../data/store");

function summary(req, res) {
  const totalProducts = store.products.length;
  const totalSuppliers = store.suppliers.length;
  const totalStockQty = store.products.reduce((s,p)=> s + (Number(p.quantity)||0), 0);
  const totalStockValue = store.products.reduce((s,p)=> s + ((Number(p.quantity)||0) * (Number(p.price)||0)), 0);
  const lowStock = store.products.filter(p => (Number(p.quantity)||0) <= (Number(p.reorderLevel)||0));
  const recentActivities = store.activityLogs.slice(-10).reverse();
  return res.json({ totalProducts, totalSuppliers, totalStockQty, totalStockValue, lowStockCount: lowStock.length, lowStockItems: lowStock, recentActivities });
}

module.exports = { summary };
