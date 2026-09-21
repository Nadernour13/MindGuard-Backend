const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/auth");
const { notImplemented } = require("../utils/stub");

// FR-14, FR-22
router.get("/", requireAuth, notImplemented("GET /api/family"));
router.post("/", requireAuth, notImplemented("POST /api/family"));

module.exports = router;
