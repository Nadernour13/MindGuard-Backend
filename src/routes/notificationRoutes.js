const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/auth");
const { notImplemented } = require("../utils/stub");

// NEW — FR-27, FR-28 (a general notification center, separate from the SOS-specific
// POST /api/alerts/sos that already exists)
router.get("/", requireAuth, notImplemented("GET /api/notifications"));
router.put("/:id/read", requireAuth, notImplemented("PUT /api/notifications/:id/read"));

module.exports = router;
