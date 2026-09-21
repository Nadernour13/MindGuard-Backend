const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  userId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  fullName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  passwordHash: { type: DataTypes.STRING, allowNull: false },
  phoneNumber: DataTypes.STRING,
  // lowercase strings to match Yousef's Flutter app ("patient" / "caregiver" / "doctor")
  role: { type: DataTypes.ENUM("patient", "caregiver", "doctor"), allowNull: false },
  lastLogin: DataTypes.DATE,
}, { timestamps: true, createdAt: "createdAt", updatedAt: false });

const Patient = sequelize.define("Patient", {
  patientId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  dateOfBirth: DataTypes.DATEONLY,
  gender: DataTypes.STRING,
  medicalNotes: DataTypes.TEXT,
});

const Caregiver = sequelize.define("Caregiver", {
  caregiverId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  relationshipToPatient: DataTypes.STRING,
});

const Doctor = sequelize.define("Doctor", {
  doctorId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  medicalSpecialty: DataTypes.STRING,
  professionalInformation: DataTypes.TEXT,
});

module.exports = { User, Patient, Caregiver, Doctor };
