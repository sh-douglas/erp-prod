const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware.js");
const { show } = require("../controllers/user.controller.js");

router.get("/me", authMiddleware, show);

module.exports = router;
