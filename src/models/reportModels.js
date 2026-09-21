const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// FR-27, FR-28
const Notification = sequelize.define("Notification", {
  notificationId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  patientId: DataTypes.INTEGER,
  recipientUserId: { type: DataTypes.INTEGER, allowNull: false },
  notificationType: DataTypes.STRING, // "SOS", "FallDetected", "LowBattery", "SafeZoneExit"...
  message: DataTypes.STRING,
  status: { type: DataTypes.STRING, defaultValue: "unread" },
}, { timestamps: true, createdAt: "dateTime", updatedAt: false });

// FR-24, FR-41 — matches Yousef's GET /api/reports
const Report = sequelize.define("Report", {
  reportId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  patientId: { type: DataTypes.INTEGER, allowNull: false },
  reportType: { type: DataTypes.STRING, defaultValue: "daily" }, // daily / weekly
  memoryScore: DataTypes.FLOAT,
  medicationAdherence: DataTypes.FLOAT,
  dailyActivity: DataTypes.STRING,
  sleepSummary: DataTypes.STRING,
  aiSummary: DataTypes.TEXT,
  reportDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

// FR-38, FR-39 — produced by the AI microservice
const AiInsight = sequelize.define("AiInsight", {
  insightId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  patientId: { type: DataTypes.INTEGER, allowNull: false },
  insightType: DataTypes.STRING,
  riskLevel: { type: DataTypes.STRING, defaultValue: "low" }, // low / medium / high
  detectedPattern: DataTypes.TEXT,
  aiRecommendation: DataTypes.TEXT,
  generatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

module.exports = { Notification, Report, AiInsight };
