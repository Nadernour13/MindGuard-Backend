const jwt = require("jsonwebtoken");
const { failure } = require("../utils/response");
require("dotenv").config();

// Verifies the "Authorization: Bearer <token>" header and attaches req.user
function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return failure(res, 401, "Missing or invalid Authorization header");
  }

  const token = header.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { userId, role }
    next();
  } catch (err) {
    return failure(res, 401, "Invalid or expired token");
  }
}

// Usage: requireRole("caregiver") or requireRole("caregiver", "doctor")
function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return failure(res, 403, "You don't have permission to do this");
    }
    next();
  };
}

module.exports = { requireAuth, requireRole };
