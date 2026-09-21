const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/auth");
const { notImplemented } = require("../utils/stub");

// NEW — FR-38, FR-39, FR-41. Calls the separate Python microservice
// (AI_SERVICE_BASE_URL in .env) that loads Yousef the Data Scientist's .pkl models.
router.post("/analyze/:patientId", requireAuth, notImplemented("POST /api/ai/analyze/:patientId"));
router.get("/insights", requireAuth, notImplemented("GET /api/ai/insights"));
router.get("/summary", requireAuth, notImplemented("GET /api/ai/summary"));

module.exports = router;
