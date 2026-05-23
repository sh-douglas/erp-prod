const User = require("../models/User");

async function findByEmail(email) {
  return await User.findOne({ email });
}

async function findByEmployeeCode(employeeCode) {
  return await User.findOne({ employeeCode });
}
async function create(data) {
  return await User.create(data);
}
async function updatePassword(user, passwordHash) {
  user.passwordHash = passwordHash;
  return await user.save();
}

module.exports = {
  findUserByEmail,
  findByEmployeeCode,
  create,
  updatePassword,
};
