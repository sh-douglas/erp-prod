const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const AuthService = require("../services/auth.service.js");

const { ZodError } = require("zod");
const AppError = require("../utils/AppError.js");

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
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Preenchimento dos campos obrigatorio.",
      });
    }
    const registeredUser = await User.findOne({ email });

    if (!registeredUser) {
      return res.status(401).json({
        message: "E-mail ou senha inválidos.",
      });
    }

    const userPassword = await bcrypt.compare(
      password,
      registeredUser.passwordHash,
    );

    if (!userPassword) {
      return res.status(401).json({
        message: "E-mail ou senha inválidos.",
      });
    }

    // Aqui eu preciso gerar o token
    const token = jwt.sign(
      {
        sub: registeredUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    return res.status(200).json({
      message: "Login realizado com sucesso!",
      token,
      user: {
        id: registeredUser._id,
        name: registeredUser.name,
        email: registeredUser.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro interno, tente novamente.",
      erro: error,
    });
  }
}

async function passwordRecovery(req, res) {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({
        message: "Preenchimento dos campos obrigatorio.",
      });
    }
    const registeredUser = await User.findOne({ email });

    if (!registeredUser) {
      return res.status(404).json({
        message: "Usuário não encontrado",
      });
    }
    const salt = await bcrypt.genSalt(12);
    const hasheredNewPassword = await bcrypt.hash(newPassword, salt);

    registeredUser.passwordHash = hasheredNewPassword;

    await registeredUser.save();

    return res.status(200).json({
      message: "Senha atualizada com sucesso.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro interno, tente novamente.",
    });
  }
}

module.exports = {
  register,
  login,
  passwordRecovery,
};
