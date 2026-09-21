const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/auth");
const { notImplemented } = require("../utils/stub");

// FR-26
router.get("/", requireAuth, notImplemented("GET /api/voice-notes"));
router.post("/", requireAuth, notImplemented("POST /api/voice-notes"));

module.exports = router;
