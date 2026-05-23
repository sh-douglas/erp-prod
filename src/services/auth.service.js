const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AppError = require("../utils/AppError.js");
const UserRepository = require("../repositories/user.repository.js");
const counterService = require("../services/counter.service.js");
const {
  registerSchema,
  loginSchema,
  passwordRecoverySchema,
} = require("../validators/auth.validator.js");

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

async function login(data) {
  const cleanData = loginSchema.parse(data);
  const registeredUser = await UserRepository.findByEmployeeCode(
    cleanData.employeeCode,
  );

  if (!registeredUser) {
    throw new AppError("Código ou senha inválidos.", 401);
  }

  const passwordMatch = await bcryptjs.compare(
    cleanData.password,
    registeredUser.passwordHash,
  );

  if (!passwordMatch) {
    throw new AppError("Código ou senha inválidos.", 401);
  }

  const token = jwt.sign(
    {
      sub: registeredUser._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  return {
    message: "Login realizado com sucesso!",
    token,
    user: {
      id: registeredUser._id,
      name: registeredUser.name,
      email: registeredUser.email,
      employeeCode: registeredUser.employeeCode,
    },
  };
}

async function passwordRecovery(data) {
  const cleanData = passwordRecoverySchema.parse(data);
  const registeredUser = await UserRepository.findByEmployeeCode(
    cleanData.employeeCode,
  );

  if (!registeredUser) {
    throw new AppError("Código de usuário não encontrado.", 404);
  }

  const salt = await bcryptjs.genSalt(12);
  const hashedNewPassword = await bcryptjs.hash(cleanData.newPassword, salt);

  await UserRepository.updatePassword(registeredUser, hashedNewPassword);

  return {
    message: "Senha alterada com sucesso!",
  };
}

module.exports = {
  register,
  login,
  passwordRecovery,
};
