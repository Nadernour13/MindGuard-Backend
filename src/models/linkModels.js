const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// FR-04, FR-07
const PatientCaregiverLink = sequelize.define("PatientCaregiverLink", {
  linkId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  patientId: { type: DataTypes.INTEGER, allowNull: false },
  caregiverId: { type: DataTypes.INTEGER, allowNull: false },
  permissionLevel: { type: DataTypes.ENUM("primary", "secondary"), defaultValue: "secondary" },
  dateLinked: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

// FR-05
const PatientDoctorLink = sequelize.define("PatientDoctorLink", {
  linkId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  patientId: { type: DataTypes.INTEGER, allowNull: false },
  doctorId: { type: DataTypes.INTEGER, allowNull: false },
  dateLinked: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  accessStatus: { type: DataTypes.STRING, defaultValue: "active" },
});

// Temporary invite codes used by POST /api/links/invite
const LinkInvitation = sequelize.define("LinkInvitation", {
  invitationId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  patientId: { type: DataTypes.INTEGER, allowNull: false },
  code: { type: DataTypes.STRING, allowNull: false, unique: true },
  expiresAt: { type: DataTypes.DATE, allowNull: false },
  used: { type: DataTypes.BOOLEAN, defaultValue: false },
});

module.exports = { PatientCaregiverLink, PatientDoctorLink, LinkInvitation };
