const express = require("express");
const router = express.Router();
const { requireAuth, requireRole } = require("../middleware/auth");
const { notImplemented } = require("../utils/stub");

// NEW — the Doctor role wasn't covered anywhere in ANALYSIS.md (only patient/caregiver).
// FR-05, plus the "viewPatientHealth / viewAIInsights / viewAssessmentResults /
// provideMedicalGuidance" use cases from the class + use-case diagrams.
router.get("/patients", requireAuth, requireRole("doctor"), notImplemented("GET /api/doctor/patients"));
router.get("/patients/:patientId/overview", requireAuth, requireRole("doctor"), notImplemented("GET /api/doctor/patients/:patientId/overview"));

module.exports = router;
