const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/auth");
const { notImplemented } = require("../utils/stub");

// FR-21 — paths match ANALYSIS.md exactly
router.get("/", requireAuth, notImplemented("GET /api/medications"));
router.post("/", requireAuth, notImplemented("POST /api/medications"));
router.put("/:id", requireAuth, notImplemented("PUT /api/medications/:id"));
router.delete("/:id", requireAuth, notImplemented("DELETE /api/medications/:id"));

module.exports = router;
