const express = require("express");
const ctrl = require("../controllers/supplierController");
const router = express.Router();
router.get("/", ctrl.listSuppliers);
router.post("/", ctrl.createSupplier);
router.put("/:id", ctrl.updateSupplier);
router.delete("/:id", ctrl.deleteSupplier);
module.exports = router;
