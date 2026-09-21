const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Patient, Caregiver, Doctor } = require("../models/userModels");
const { success, failure } = require("../utils/response");
require("dotenv").config();

function generateToken(user) {
  return jwt.sign(
    { userId: user.userId, role: user.role, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );
}

// POST /api/auth/register — { fullName, email, password, role }
async function register(req, res) {
  const { fullName, email, password, role, phoneNumber } = req.body;

  if (!fullName || !email || !password || !role) {
    return failure(res, 400, "fullName, email, password and role are required");
  }
  if (!["patient", "caregiver", "doctor"].includes(role)) {
    return failure(res, 400, "role must be patient, caregiver or doctor");
  }

  const existing = await User.findOne({ where: { email } });
  if (existing) {
    return failure(res, 400, "Email already in use");
  }

  const passwordHash = await bcrypt.hash(password, 10); // NFR-04
  const user = await User.create({ fullName, email, passwordHash, role, phoneNumber });

  // Create the role-specific row too
  if (role === "patient") await Patient.create({ userId: user.userId });
  if (role === "caregiver") await Caregiver.create({ userId: user.userId });
  if (role === "doctor") await Doctor.create({ userId: user.userId });

  const token = generateToken(user);
  return success(res, 201, "Registered successfully", {
    token,
    user: { userId: user.userId, fullName: user.fullName, email: user.email, role: user.role },
  });
}

// POST /api/auth/login — { email, password }
async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return failure(res, 400, "email and password are required");
  }

  const user = await User.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return failure(res, 401, "Invalid email or password");
  }

  user.lastLogin = new Date();
  await user.save();

  const token = generateToken(user);
  return success(res, 200, "Logged in successfully", {
    token,
    user: { userId: user.userId, fullName: user.fullName, email: user.email, role: user.role },
  });
}

// POST /api/auth/forgot-password — { email }
async function forgotPassword(req, res) {
  const { email } = req.body;
  if (!email) return failure(res, 400, "email is required");

  const user = await User.findOne({ where: { email } });
  // Always respond the same way whether or not the email exists (avoid leaking which emails are registered)
  // TODO: generate a real reset token and email/SMS it once notification sending is wired up
  return success(res, 200, "If that email exists, a reset link has been sent");
}

module.exports = { register, login, forgotPassword };
