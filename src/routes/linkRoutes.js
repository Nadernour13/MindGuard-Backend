const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/auth");
const linkController = require("../controllers/linkController");

// FR-04, FR-05, FR-07 — now fully implemented (was stubbed before)
router.post("/invite", requireAuth, linkController.createInvite);
router.post("/accept", requireAuth, linkController.acceptInvite);
router.get("/caregivers", requireAuth, linkController.getCaregivers);
router.get("/doctors", requireAuth, linkController.getDoctors);
router.put("/caregiver/:linkId/permission", requireAuth, linkController.updateCaregiverPermission);
router.delete("/caregiver/:linkId", requireAuth, linkController.removeCaregiverLink);
router.delete("/doctor/:linkId", requireAuth, linkController.removeDoctorLink);

module.exports = router;
