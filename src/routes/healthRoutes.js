const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/auth");
const { notImplemented } = require("../utils/stub");

// FR-31, FR-32 — existing, matches ANALYSIS.md
router.get("/latest", requireAuth, notImplemented("GET /api/health/latest"));

// FR-31 — NEW: ingestion endpoint for the smartwatch to push readings
router.post("/data", requireAuth, notImplemented("POST /api/health/data"));

// FR-10, FR-19 — NEW: location polling (every 3-5s), tagged with smartWatchId
router.post("/location", requireAuth, notImplemented("POST /api/health/location"));
router.get("/location/latest", requireAuth, notImplemented("GET /api/health/location/latest"));

module.exports = router;
