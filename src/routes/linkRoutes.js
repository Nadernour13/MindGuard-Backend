const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/auth");
const { notImplemented } = require("../utils/stub");

// NEW — FR-04, FR-05, FR-07 (missing from ANALYSIS.md's original endpoint list,
// but required by the SRS and flagged in its own "Missing information" section)
router.post("/invite", requireAuth, notImplemented("POST /api/links/invite"));
router.post("/accept", requireAuth, notImplemented("POST /api/links/accept"));
router.get("/caregivers", requireAuth, notImplemented("GET /api/links/caregivers"));
router.get("/doctors", requireAuth, notImplemented("GET /api/links/doctors"));
router.put("/caregiver/:linkId/permission", requireAuth, notImplemented("PUT /api/links/caregiver/:linkId/permission"));
router.delete("/caregiver/:linkId", requireAuth, notImplemented("DELETE /api/links/caregiver/:linkId"));
router.delete("/doctor/:linkId", requireAuth, notImplemented("DELETE /api/links/doctor/:linkId"));

module.exports = router;
