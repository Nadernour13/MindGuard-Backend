const express = require("express");
const router = express.Router();
const { requireAuth, requireRole } = require("../middleware/auth");
const { notImplemented } = require("../utils/stub");

// FR-18
router.get("/dashboard", requireAuth, requireRole("caregiver"), notImplemented("GET /api/caregiver/dashboard"));

module.exports = router;
