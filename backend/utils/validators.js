const ROLES = require("../constants/roles");

const isEmail = (value = "") => /^\S+@\S+\.\S+$/.test(String(value).trim());

const normalizeEmail = (value = "") => String(value).trim().toLowerCase();

const validateRegisterPayload = ({ name, email, password, role }) => {
  if (!name || !email || !password) {
    return "Name, email and password are required.";
  }

  if (!isEmail(email)) {
    return "Please provide a valid email address.";
  }

  if (String(password).length < 6) {
    return "Password must be at least 6 characters long.";
  }

  if (role && !Object.values(ROLES).includes(role)) {
    return "Invalid role selected.";
  }

  return null;
};

const validateLoginPayload = ({ email, password }) => {
  if (!email || !password) {
    return "Email and password are required.";
  }

  if (!isEmail(email)) {
    return "Please provide a valid email address.";
  }

  return null;
};

const validateJobPayload = ({ title, company, location, description }) => {
  if (!title || !company || !location || !description) {
    return "All fields are required.";
  }

  return null;
};

module.exports = {
  isEmail,
  normalizeEmail,
  validateRegisterPayload,
  validateLoginPayload,
  validateJobPayload,
};
