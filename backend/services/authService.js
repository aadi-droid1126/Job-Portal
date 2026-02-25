const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const {
  normalizeEmail,
  validateLoginPayload,
  validateRegisterPayload,
} = require("../utils/validators");

const sanitizeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
});

const registerUser = async (payload) => {
  const error = validateRegisterPayload(payload);
  if (error) {
    return { error, status: 400 };
  }

  const email = normalizeEmail(payload.email);
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return { error: "User already exists.", status: 400 };
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const user = await User.create({
    name: payload.name,
    email,
    password: hashedPassword,
    role: payload.role,
  });

  return {
    data: {
      user: sanitizeUser(user),
      token: generateToken(user._id),
    },
    status: 201,
  };
};

const loginUser = async (payload) => {
  const error = validateLoginPayload(payload);
  if (error) {
    return { error, status: 400 };
  }

  const email = normalizeEmail(payload.email);
  const user = await User.findOne({ email });

  if (!user) {
    return { error: "Invalid credentials.", status: 400 };
  }

  const isMatch = await bcrypt.compare(payload.password, user.password);
  if (!isMatch) {
    return { error: "Invalid credentials.", status: 400 };
  }

  return {
    data: {
      user: sanitizeUser(user),
      token: generateToken(user._id),
    },
    status: 200,
  };
};

module.exports = {
  sanitizeUser,
  registerUser,
  loginUser,
};
