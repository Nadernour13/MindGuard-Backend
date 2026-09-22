const crypto = require("crypto");
const { PatientCaregiverLink, PatientDoctorLink, LinkInvitation } = require("../models/linkModels");
const { Patient, Caregiver, Doctor, User } = require("../models/userModels");
const { success, failure } = require("../utils/response");

const INVITE_EXPIRY_MINUTES = 60 * 24; // 24 hours

// POST /api/links/invite — { patientId }  (FR-04, FR-05)
async function createInvite(req, res) {
  const { patientId } = req.body;
  if (!patientId) return failure(res, 400, "patientId is required");

  const patient = await Patient.findByPk(patientId);
  if (!patient) return failure(res, 404, "Patient not found");

  const code = crypto.randomBytes(4).toString("hex").toUpperCase(); // e.g. "A1B2C3D4"
  const expiresAt = new Date(Date.now() + INVITE_EXPIRY_MINUTES * 60 * 1000);

  await LinkInvitation.create({ patientId, code, expiresAt });

  return success(res, 201, "Invitation created", { invitationCode: code, expiresAt });
}

// POST /api/links/accept — { invitationCode }  (FR-04, FR-05, FR-07)
// req.user comes from the JWT set by requireAuth — the caller is whoever is logged in
async function acceptInvite(req, res) {
  const { invitationCode } = req.body;
  if (!invitationCode) return failure(res, 400, "invitationCode is required");

  const invite = await LinkInvitation.findOne({ where: { code: invitationCode } });
  if (!invite) return failure(res, 404, "Invalid invitation code");
  if (invite.used) return failure(res, 400, "This invitation code was already used");
  if (new Date() > invite.expiresAt) return failure(res, 400, "This invitation code has expired");

  const { userId, role } = req.user;

  if (role === "caregiver") {
    const caregiver = await Caregiver.findOne({ where: { userId } });
    if (!caregiver) return failure(res, 404, "Caregiver profile not found");

    const link = await PatientCaregiverLink.create({
      patientId: invite.patientId,
      caregiverId: caregiver.caregiverId,
      permissionLevel: "secondary", // FR-07 default
    });

    invite.used = true;
    await invite.save();

    return success(res, 201, "Linked as caregiver", { linkId: link.linkId, permissionLevel: link.permissionLevel });
  }

  if (role === "doctor") {
    const doctor = await Doctor.findOne({ where: { userId } });
    if (!doctor) return failure(res, 404, "Doctor profile not found");

    const link = await PatientDoctorLink.create({
      patientId: invite.patientId,
      doctorId: doctor.doctorId,
    });

    invite.used = true;
    await invite.save();

    return success(res, 201, "Linked as doctor", { linkId: link.linkId });
  }

  return failure(res, 403, "Only caregivers or doctors can accept a link invitation");
}

// GET /api/links/caregivers?patientId=  (FR-04)
async function getCaregivers(req, res) {
  const { patientId } = req.query;
  if (!patientId) return failure(res, 400, "patientId is required");

  const links = await PatientCaregiverLink.findAll({ where: { patientId } });
  return success(res, 200, "Caregivers fetched", links);
}

// GET /api/links/doctors?patientId=  (FR-05)
async function getDoctors(req, res) {
  const { patientId } = req.query;
  if (!patientId) return failure(res, 400, "patientId is required");

  const links = await PatientDoctorLink.findAll({ where: { patientId } });
  return success(res, 200, "Doctors fetched", links);
}

// PUT /api/links/caregiver/:linkId/permission — { permissionLevel }  (FR-07)
async function updateCaregiverPermission(req, res) {
  const { linkId } = req.params;
  const { permissionLevel } = req.body;

  if (!["primary", "secondary"].includes(permissionLevel)) {
    return failure(res, 400, "permissionLevel must be 'primary' or 'secondary'");
  }

  const link = await PatientCaregiverLink.findByPk(linkId);
  if (!link) return failure(res, 404, "Link not found");

  link.permissionLevel = permissionLevel;
  await link.save();

  return success(res, 200, "Permission updated", link);
}

// DELETE /api/links/caregiver/:linkId
async function removeCaregiverLink(req, res) {
  const { linkId } = req.params;
  const deleted = await PatientCaregiverLink.destroy({ where: { linkId } });
  if (!deleted) return failure(res, 404, "Link not found");
  return success(res, 200, "Caregiver link removed");
}

// DELETE /api/links/doctor/:linkId
async function removeDoctorLink(req, res) {
  const { linkId } = req.params;
  const deleted = await PatientDoctorLink.destroy({ where: { linkId } });
  if (!deleted) return failure(res, 404, "Link not found");
  return success(res, 200, "Doctor link removed");
}

module.exports = {
  createInvite, acceptInvite, getCaregivers, getDoctors,
  updateCaregiverPermission, removeCaregiverLink, removeDoctorLink,
};
