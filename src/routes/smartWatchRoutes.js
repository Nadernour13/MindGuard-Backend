const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/auth");
const { notImplemented } = require("../utils/stub");

// NEW — FR-29 to FR-35 (ANALYSIS.md only vaguely mentioned "ingestion endpoints for
// smartwatch data"; these make it explicit)
router.post("/pair", requireAuth, notImplemented("POST /api/smartwatch/pair"));
router.post("/:id/fall-alert", requireAuth, notImplemented("POST /api/smartwatch/:id/fall-alert"));
router.post("/:id/sleep-data", requireAuth, notImplemented("POST /api/smartwatch/:id/sleep-data"));
router.get("/:id/status", requireAuth, notImplemented("GET /api/smartwatch/:id/status"));

module.exports = router;
