const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// FR-12, FR-23, FR-36
const MemoryExercise = sequelize.define("MemoryExercise", {
  exerciseId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  exerciseType: DataTypes.STRING,
  difficultyLevel: { type: DataTypes.STRING, defaultValue: "easy" },
  exerciseContent: DataTypes.TEXT,
});

// FR-37 — matches Yousef's POST /api/exercises/results
const MemoryExerciseResult = sequelize.define("MemoryExerciseResult", {
  resultId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  exerciseId: DataTypes.INTEGER,
  patientId: { type: DataTypes.INTEGER, allowNull: false },
  score: DataTypes.INTEGER, // matches Yousef's field name "score"
  completionDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

// FR-31, FR-32 — matches Yousef's GET /api/health/latest
const HealthRecord = sequelize.define("HealthRecord", {
  recordId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  patientId: { type: DataTypes.INTEGER, allowNull: false },
  heartRate: DataTypes.INTEGER,
  bloodOxygenLevel: DataTypes.FLOAT,
  stepCount: DataTypes.INTEGER,
  sleepDuration: DataTypes.FLOAT,
  activityLevel: DataTypes.STRING,
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

// FR-10, FR-19 — polled every 3-5s; smartWatchId added in the updated class diagram
const LocationRecord = sequelize.define("LocationRecord", {
  locationId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  patientId: { type: DataTypes.INTEGER, allowNull: false },
  smartWatchId: DataTypes.INTEGER,
  latitude: { type: DataTypes.FLOAT, allowNull: false },
  longitude: { type: DataTypes.FLOAT, allowNull: false },
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

// FR-20 — new entity added in the updated class diagram (not in Yousef's original list)
const SafeZone = sequelize.define("SafeZone", {
  safeZoneId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  patientId: { type: DataTypes.INTEGER, allowNull: false },
  zoneName: DataTypes.STRING,
  latitude: { type: DataTypes.FLOAT, allowNull: false },
  longitude: { type: DataTypes.FLOAT, allowNull: false },
  radius: { type: DataTypes.FLOAT, allowNull: false }, // meters
  status: { type: DataTypes.STRING, defaultValue: "active" },
});

// FR-29 to FR-35
const SmartWatch = sequelize.define("SmartWatch", {
  smartWatchId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  patientId: { type: DataTypes.INTEGER, allowNull: false },
  deviceName: DataTypes.STRING,
  deviceIdentifier: DataTypes.STRING,
  connectionStatus: { type: DataTypes.STRING, defaultValue: "disconnected" },
  batteryLevel: DataTypes.INTEGER,
  lastConnectedAt: DataTypes.DATE,
});

module.exports = {
  MemoryExercise, MemoryExerciseResult, HealthRecord, LocationRecord, SafeZone, SmartWatch,
};
