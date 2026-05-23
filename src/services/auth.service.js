const bcryptjs = require("bcryptjs");
const AppError = require("../utils/AppError.js");
const UserRepository = require("../repositories/user.repository.js");
const counterService = require("../services/counter.service.js");
const { registerSchema } = require("../validators/auth.validator.js");

async function register(data) {
  const cleanData = registerSchema.parse(data);
  const registeredUser = await UserRepository.findByEmail(cleanData.email);

  if (registeredUser) {
    throw new AppError("Usuário já cadastrado", 409);
  }

  const employeeCode = await counterService.generateEmployeeCode();
  const salt = await bcryptjs.genSalt(12);
  const hashedPassword = await bcryptjs.hash(cleanData.password, salt);
  const createdUser = await UserRepository.create({
    name: cleanData.name,
    email: cleanData.email,
    employeeCode,
    passwordHash: hashedPassword,
  });

  return {
    message: "Usuário criado com sucesso!",
    user: {
      name: createdUser.name,
      email: createdUser.email,
      employeeCode: createdUser.employeeCode,
    },
  };
}

module.exports = {
  register,
};
