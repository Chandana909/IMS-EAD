const express = require("express");
const ctrl = require("../controllers/stockController");
const router = express.Router();
router.get("/movements", ctrl.listStockMovements);
router.post("/adjust", ctrl.adjustStock);
module.exports = router;
