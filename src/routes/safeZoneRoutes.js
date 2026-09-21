const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/auth");
const { notImplemented } = require("../utils/stub");

// NEW — FR-20, added as a full entity in the updated class diagram
router.get("/", requireAuth, notImplemented("GET /api/safe-zones"));
router.post("/", requireAuth, notImplemented("POST /api/safe-zones"));
router.put("/:id", requireAuth, notImplemented("PUT /api/safe-zones/:id"));
router.delete("/:id", requireAuth, notImplemented("DELETE /api/safe-zones/:id"));
router.put("/:id/activate", requireAuth, notImplemented("PUT /api/safe-zones/:id/activate"));
router.put("/:id/deactivate", requireAuth, notImplemented("PUT /api/safe-zones/:id/deactivate"));
// Note: checkBoundary() from the class diagram isn't its own endpoint — it should run
// internally whenever POST /api/health/location receives a new point.

module.exports = router;
