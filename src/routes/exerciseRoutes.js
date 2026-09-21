const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/auth");
const { notImplemented } = require("../utils/stub");

// FR-12, FR-36
router.get("/today", requireAuth, notImplemented("GET /api/exercises/today"));
// FR-37
router.post("/results", requireAuth, notImplemented("POST /api/exercises/results"));

module.exports = router;
