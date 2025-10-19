// controllers/settingsController.js
const store = require("../data/store");
const { now, id } = require("../utils/helpers");

function getSettings(req, res) { return res.json(store.settings); }

function updateSettings(req, res) {
  Object.assign(store.settings, req.body);
  store.activityLogs.push({ id: id(), user: "system", action: "SETTINGS_UPDATED", entityType: "settings", entityId: null, details: req.body, timestamp: now() });
  return res.json(store.settings);
}

module.exports = { getSettings, updateSettings };
