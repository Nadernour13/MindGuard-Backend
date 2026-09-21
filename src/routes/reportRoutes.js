const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/auth");
const { notImplemented } = require("../utils/stub");

// FR-24, FR-25
router.get("/", requireAuth, notImplemented("GET /api/reports"));

module.exports = router;
