const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Route mounting — paths match mindguard_app/ANALYSIS.md exactly where they existed there
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));          // NEW
app.use("/api/links", require("./routes/linkRoutes"));          // NEW
app.use("/api/medications", require("./routes/medicationRoutes"));
app.use("/api/family", require("./routes/familyRoutes"));
app.use("/api/exercises", require("./routes/exerciseRoutes"));
app.use("/api/health", require("./routes/healthRoutes"));
app.use("/api/smartwatch", require("./routes/smartWatchRoutes")); // NEW
app.use("/api/safe-zones", require("./routes/safeZoneRoutes"));   // NEW
app.use("/api/caregiver", require("./routes/caregiverRoutes"));
app.use("/api/doctor", require("./routes/doctorRoutes"));         // NEW
app.use("/api/reports", require("./routes/reportRoutes"));
app.use("/api/voice-notes", require("./routes/voiceNoteRoutes"));
app.use("/api/alerts", require("./routes/alertRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes")); // NEW
app.use("/api/ai", require("./routes/aiRoutes"));                      // NEW

app.get("/", (req, res) => {
  res.json({ success: true, message: "MindGuard API is running", data: null });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found", errors: null });
});

// Central error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: "Internal server error", errors: err.message });
});

module.exports = app;
