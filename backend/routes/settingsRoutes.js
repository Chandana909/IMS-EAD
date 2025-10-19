const express = require("express");
const ctrl = require("../controllers/settingsController");
const router = express.Router();
router.get("/", ctrl.getSettings);
router.put("/", ctrl.updateSettings);
module.exports = router;
