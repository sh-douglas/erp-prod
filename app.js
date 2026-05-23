require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

const connection = require("./src/config/database.js");
const authRoutes = require("./src/routes/auth.routes.js");

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);

connection().then(() => {
  app.listen(port, () => {
    console.log(`O servidor está rodando na porta: ${port}`);
  });
});
