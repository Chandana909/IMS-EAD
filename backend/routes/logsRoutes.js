const express = require("express");
const ctrl = require("../controllers/logsController");
const router = express.Router();
router.get("/", ctrl.listLogs);
module.exports = router;
