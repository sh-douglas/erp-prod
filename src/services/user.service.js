const UserRepository = require("../repositories/user.repository.js");
const AppError = require("../utils/AppError.js");

async function getUserData(userId) {
  const user = await UserRepository.findById(userId);

  if (!user) {
    throw new AppError("Usuário não encontrado", 404);
  }

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    employeeCode: user.employeeCode,
  };
}

module.exports = {
  getUserData,
};
