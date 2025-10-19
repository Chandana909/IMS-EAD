const express = require("express");
const ctrl = require("../controllers/purchaseController");
const router = express.Router();
router.get("/", ctrl.listPurchases);
router.post("/", ctrl.createPurchase);
module.exports = router;
