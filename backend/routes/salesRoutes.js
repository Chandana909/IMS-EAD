const express = require("express");
const ctrl = require("../controllers/salesController");
const router = express.Router();
router.get("/", ctrl.listSales);
router.post("/", ctrl.createSale);
module.exports = router;
