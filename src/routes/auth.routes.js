const express = require("express");
const router = express.Router();
const {
  register,
  login,
  passwordRecovery,
} = require("../controllers/auth.controller.js");

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", passwordRecovery);

module.exports = router;
