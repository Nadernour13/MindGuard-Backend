const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/auth");
const { notImplemented } = require("../utils/stub");

// NEW — FR-06 (profile management), FR-08 (deactivate account)
router.get("/:userId/profile", requireAuth, notImplemented("GET /api/users/:userId/profile"));
router.put("/:userId/profile", requireAuth, notImplemented("PUT /api/users/:userId/profile"));
router.delete("/:userId", requireAuth, notImplemented("DELETE /api/users/:userId"));

module.exports = router;
