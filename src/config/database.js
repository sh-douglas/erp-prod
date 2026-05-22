const mongoose = require("mongoose");

async function connection() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Banco de Dados conectado com sucesso.");
  } catch (error) {
    console.error(`Erro ao conectado ao banco de dados: ${error}`);
  }
}

module.exports = connection;
