// controllers/logsController.js
const store = require("../data/store");

function listLogs(req, res) {
  const { action } = req.query;
  let logs = store.activityLogs;
  if(action) logs = logs.filter(l => l.action === action);
  return res.json(logs);
}

module.exports = { listLogs };
