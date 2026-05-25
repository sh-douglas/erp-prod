const { ZodError } = require("zod");
const AppError = require("../utils/AppError.js");

const UserService = require("../services/user.service.js");

async function show(req, res) {
  try {
    const userId = req.user.id;
    const user = await UserService.getUserData(userId);
    return res.json(user);
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
  show,
};
