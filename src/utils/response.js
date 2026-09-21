// Matches the envelope defined in mindguard_app/ANALYSIS.md:
// success -> { success: true, message, data }
// failure -> { success: false, message, errors }

function success(res, statusCode, message, data = null) {
  return res.status(statusCode).json({ success: true, message, data });
}

function failure(res, statusCode, message, errors = null) {
  return res.status(statusCode).json({ success: false, message, errors });
}

module.exports = { success, failure };
