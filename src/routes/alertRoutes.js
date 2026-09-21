const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/auth");
const { notImplemented } = require("../utils/stub");

// FR-15 <<include>> FR-10 — Emergency SOS
router.post("/sos", requireAuth, notImplemented("POST /api/alerts/sos"));

module.exports = router;
