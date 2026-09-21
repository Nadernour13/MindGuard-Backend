const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// FR-21 — matches Yousef's /api/medications
const Medication = sequelize.define("Medication", {
  medicationId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  patientId: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false }, // matches Yousef's field name "name"
  time: DataTypes.STRING,                             // matches Yousef's field name "time"
  voiceMessage: DataTypes.STRING,
  dosage: DataTypes.STRING,
  status: { type: DataTypes.STRING, defaultValue: "pending" }, // taken / pending
  startDate: DataTypes.DATEONLY,
  endDate: DataTypes.DATEONLY,
});

// FR-14, FR-22 — matches Yousef's /api/family
const FamilyMember = sequelize.define("FamilyMember", {
  familyMemberId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  patientId: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  relation: DataTypes.STRING, // matches Yousef's field name "relation"
  photoUrl: DataTypes.STRING, // Azure Blob Storage URL
  voiceRecordingUrl: DataTypes.STRING,
});

// FR-26 — matches Yousef's /api/voice-notes
const VoiceNote = sequelize.define("VoiceNote", {
  voiceNoteId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  patientId: { type: DataTypes.INTEGER, allowNull: false },
  recordedByUserId: DataTypes.INTEGER,
  audioFileUrl: DataTypes.STRING, // Azure Blob Storage URL
  scheduledTime: DataTypes.DATE,
  status: { type: DataTypes.STRING, defaultValue: "pending" },
});

module.exports = { Medication, FamilyMember, VoiceNote };
