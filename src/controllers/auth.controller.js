const { ZodError } = require("zod");

const User = require("../models/User");
const AppError = require("../utils/AppError.js");
const AuthService = require("../services/auth.service.js");

async function register(req, res) {
  try {
    const createdUser = await AuthService.register(req.body);
    return res.status(201).json(createdUser);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message:
          error.issues[0]?.message || "Verifique os campos e tente novamente.",
      });
    } else if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        message: error.message,
      });
    }
    return res.status(500).json({
      message: "Erro interno, tente novamente mais tarde!",
    });
  }
}

async function login(req, res) {
  console.log("login");
  try {
    const loggedUser = await AuthService.login(req.body);

    return res.status(200).json(loggedUser);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message:
          error.issues[0]?.message || "Verifique os campos e tente novamente.",
      });
    } else if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        message: error.message,
      });
    }
    return res.status(500).json({
      message: "Erro interno, tente novamente mais tarde!",
    });
  }
}

async function passwordRecovery(req, res) {
  try {
    const recoveryPass = await AuthService.passwordRecovery(req.body);

    return res.status(201).json(recoveryPass);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message:
          error.issues[0]?.message || "Verifique os campos e tente novamente.",
      });
    } else if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        message: error.message,
      });
    }
    return res.status(500).json({
      message: "Erro interno, tente novamente mais tarde!",
    });
  }
}

module.exports = {
  register,
  login,
  passwordRecovery,
};
